<script>
  import { onMount } from 'svelte';
  let bookings = [];
  let newBooking = {
    date: '',
    time: '',
    service: '',
    status: 'pending'
  };

  const services = [
    { id: 'nails', name: 'Uñas Acrílicas' },
    { id: 'eyebrows', name: 'Cejas HD' },
    { id: 'eyebrows-iron', name: 'Planchado de Cejas' },
    { id: 'lashes', name: 'Pestañas Mink 1x1' }
  ];

  onMount(() => {
    // In a real application, fetch bookings from your backend
    bookings = [
      {
        id: 1,
        date: '2024-03-20',
        time: '10:00',
        service: 'Uñas Acrílicas',
        status: 'confirmed'
      }
    ];
  });

  function handleAddBooking() {
    const id = bookings.length + 1;
    bookings = [...bookings, { ...newBooking, id }];
    newBooking = {
      date: '',
      time: '',
      service: '',
      status: 'pending'
    };
  }

  function updateBookingStatus(id, newStatus) {
    bookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
  }
</script>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-7xl mx-auto px-4">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-3xl font-bold mb-8 text-primary">Panel de Administración</h1>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Agregar Nueva Reserva</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            bind:value={newBooking.date}
            class="rounded-md border-gray-300 shadow-sm"
          />
          <input
            type="time"
            bind:value={newBooking.time}
            class="rounded-md border-gray-300 shadow-sm"
          />
          <select
            bind:value={newBooking.service}
            class="rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Seleccionar servicio...</option>
            {#each services as service}
              <option value={service.name}>{service.name}</option>
            {/each}
          </select>
          <button
            on:click={handleAddBooking}
            class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Agregar
          </button>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-semibold mb-4">Reservas</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each bookings as booking}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">{booking.date}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{booking.time}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{booking.service}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button
                      on:click={() => updateBookingStatus(booking.id, 'confirmed')}
                      class="text-green-600 hover:text-green-900 mr-2"
                    >
                      Confirmar
                    </button>
                    <button
                      on:click={() => updateBookingStatus(booking.id, 'cancelled')}
                      class="text-red-600 hover:text-red-900"
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>