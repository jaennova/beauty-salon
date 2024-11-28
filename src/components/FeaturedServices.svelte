<script>
  const services = [
    {
      title: 'Uñas Acrílicas',
      description: 'Diseños personalizados y acabado profesional',
      price: 'Desde $300',
      image: '/images/nails.png'
    },
    {
      title: 'Cejas HD',
      description: 'Diseño y planchado de cejas de alta definición',
      price: 'Desde $200',
      image: '/images/eyebrowns.jpg'
    },
    {
      title: 'Pestañas Mink 1x1',
      description: 'Extensiones de pestañas naturales y duraderas',
      price: 'Desde $400',
      image: '/images/lashes.jpg'
    }
  ];
</script>

<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each services as service}
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="aspect-w-16 aspect-h-9">
            <img src={service.image} alt={service.title} class="object-cover w-full h-48" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{service.title}</h3>
            <p class="text-gray-600 mb-4">{service.description}</p>
            <p class="text-primary font-bold">{service.price}</p>
          </div>
        </div>
      {/each}
    </div>
    <div class="text-center mt-12">
      <a
        href="/services"
        class="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition"
      >
        Ver Todos los Servicios
      </a>
    </div>
  </div>
</section>