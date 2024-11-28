<script>
  import websiteData from '../data/website.json';
  const { gallery } = websiteData;
  
  let selectedCategory = 'all';
  let instagramPosts = [];
  
  $: filteredImages = selectedCategory === 'all' 
    ? gallery.images 
    : gallery.images.filter(img => img.category === selectedCategory);

  const categories = ['all', ...gallery.categories];
</script>

<div class="py-8 md:py-12 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4">
    <h1 class="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 font-serif">Nuestra Galería</h1>

    <div class="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
      {#each categories as category}
        <button
          class={`px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all text-sm md:text-base
            ${selectedCategory === category 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-700 hover:bg-primary/10'}`}
          on:click={() => selectedCategory = category}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      {/each}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
      {#each filteredImages as image}
        <div class="group relative overflow-hidden rounded-lg shadow-lg aspect-square">
          <img
            src={image.url}
            alt={image.title}
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 class="text-base md:text-lg font-semibold">{image.title}</h3>
              <p class="text-sm md:text-base">{image.category}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>