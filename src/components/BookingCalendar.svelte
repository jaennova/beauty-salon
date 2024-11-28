<script>
  import { onMount } from 'svelte';
  import { Calendar } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import { format } from 'date-fns';
  import { es } from 'date-fns/locale';
  import websiteData from '../data/website.json';

  let calendarEl;
  let calendar;
  let selectedService = '';
  let selectedDateTime = null;
  let loading = false;
  let error = null;

  const services = websiteData.services.flatMap(category => 
    category.items.map(item => ({
      id: item.title.toLowerCase().replace(/\s+/g, '-'),
      name: item.title,
      duration: parseInt(item.duration.split(' ')[0]) * 60
    }))
  );

  async function fetchExistingBookings() {
    try {
      const response = await fetch('/api/appointments');
      if (!response.ok) throw new Error('Error al cargar las citas');
      const bookings = await response.json();
      return bookings.map(booking => ({
        title: 'Reservado',
        start: `${booking.date}T${booking.startTime}`,
        end: `${booking.date}T${booking.endTime}`,
        color: '#FF69B4'
      }));
    } catch (err) {
      console.error('Error fetching bookings:', err);
      return [];
    }
  }

  async function createBooking(date, service) {
    try {
      loading = true;
      error = null;
      
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          date: format(date, 'yyyy-MM-dd'),
          startTime: format(date, 'HH:mm:ss'),
          endTime: format(
            new Date(date.getTime() + service.duration * 60000),
            'HH:mm:ss'
          )
        })
      });

      if (!response.ok) throw new Error('Error al crear la cita');
      
      const booking = await response.json();
      calendar.refetchEvents();
      return booking;
    } catch (err) {
      error = err.message;
      throw err;
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    const existingBookings = await fetchExistingBookings();

    calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      slotMinTime: '09:00:00',
      slotMaxTime: '19:00:00',
      allDaySlot: false,
      slotDuration: '00:30:00',
      locale: 'es',
      events: existingBookings,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      },
      selectable: true,
      select: async function(info) {
        if (!selectedService) {
          alert('Por favor selecciona un servicio primero');
          return;
        }
        
        const service = services.find(s => s.id === selectedService);
        selectedDateTime = info.start;
        
        try {
          await createBooking(info.start, service);
          const formattedDate = format(info.start, "EEEE d 'de' MMMM 'a las' HH:mm", { locale: es });
          const message = `Hola, me gustaría agendar una cita para ${service.name} el ${formattedDate}`;
          const whatsappUrl = `https://wa.me/${websiteData.socialMedia.whatsapp.number}?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        } catch (err) {
          alert('Error al agendar la cita. Por favor intenta de nuevo.');
        }
      },
      selectConstraint: {
        start: '09:00',
        end: '19:00',
        dows: [0, 1, 2, 3, 4, 5] // Monday-Saturday
      }
    });

    calendar.render();
  });

  function handleServiceChange(event) {
    selectedService = event.target.value;
    if (calendar) {
      calendar.refetchEvents();
    }
  }
</script>

<div class="py-8 md:py-12 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <h1 class="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">Reserva tu Cita</h1>
    
    <div class="mb-6 md:mb-8">
      <label for="service" class="block text-sm font-medium text-gray-700 mb-2">
        Selecciona un Servicio
      </label>
      <select
        id="service"
        bind:value={selectedService}
        on:change={handleServiceChange}
        class="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
      >
        <option value="">Selecciona un servicio...</option>
        {#each services as service}
          <option value={service.id}>{service.name}</option>
        {/each}
      </select>
    </div>

    {#if error}
      <div class="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
        {error}
      </div>
    {/if}

    <div class="bg-white rounded-lg shadow-lg p-4 md:p-6 overflow-x-auto">
      <div class="min-w-[800px]" bind:this={calendarEl}></div>
    </div>

    <div class="mt-6 md:mt-8 text-center text-gray-600">
      <p class="text-sm md:text-base">Horario de atención: Lunes a Sábado de 9:00 AM a 7:00 PM</p>
      <p class="text-sm md:text-base mt-2">Selecciona una fecha y hora disponible para agendar tu cita por WhatsApp</p>
    </div>

    {#if loading}
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div class="bg-white p-4 rounded-lg">
          <p class="text-lg">Procesando tu reserva...</p>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(.fc) {
    max-width: 100%;
    font-family: system-ui, sans-serif;
  }

  :global(.fc-button-primary) {
    @apply bg-primary border-primary hover:bg-primary/90 hover:border-primary/90 !important;
  }

  :global(.fc-timegrid-slot) {
    height: 40px !important;
  }

  :global(.fc-event) {
    @apply cursor-pointer !important;
  }

  :global(.fc-toolbar-title) {
    @apply text-lg md:text-xl !important;
  }

  :global(.fc-button) {
    @apply text-sm md:text-base !important;
  }

  @media (max-width: 640px) {
    :global(.fc-header-toolbar) {
      @apply flex-col gap-4 !important;
    }

    :global(.fc-toolbar-chunk) {
      @apply flex justify-center !important;
    }
  }
</style>