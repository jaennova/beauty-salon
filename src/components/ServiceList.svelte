<script>
  import websiteData from '../data/website.json';
  const { services } = websiteData;
</script>

<div class="py-8 md:py-12 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <h1 class="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16">Nuestros Servicios</h1>
    
    {#each services as category}
      <div class="mb-8 md:mb-12">
        <h2 class="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-primary">{category.category}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {#each category.items as service}
            <div class="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition">
              <h3 class="text-lg md:text-xl font-semibold mb-2">{service.title}</h3>
              <p class="text-gray-600 mb-4 text-sm md:text-base">{service.description}</p>
              <div class="flex flex-wrap justify-between items-center gap-2">
                <p class="text-primary font-bold text-sm md:text-base">{service.price}</p>
                <p class="text-gray-500 text-sm">Duración: {service.duration}</p>
              </div>
              <a
                href={`https://wa.me/${websiteData.socialMedia.whatsapp.number}?text=Hola, me gustaría agendar una cita para ${service.title}`}
                target="_blank"
                rel="noopener noreferrer"
                class="mt-4 w-full md:w-auto inline-flex justify-center items-center bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-full transition text-sm md:text-base"
              >
                Reservar por WhatsApp
              </a>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>