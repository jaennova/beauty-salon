<script>
  import websiteData from '../data/website.json';
  const { businessInfo, socialMedia } = websiteData;
</script>

<div class="py-8 md:py-12 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4">
    <h1 class="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 font-serif">Contacto</h1>
    
    <div class="grid grid-cols-1 gap-8">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-6 text-primary">Información de Contacto</h2>
        <div class="space-y-6">
          <div class="flex items-start space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p class="text-sm md:text-base">{businessInfo.address}</p>
          </div>
          
          <div class="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <p class="text-sm md:text-base">WhatsApp: {businessInfo.phone}</p>
          </div>
        </div>
        
        <div class="mt-8 space-y-4">
          <h3 class="text-xl font-semibold text-primary">Síguenos en Redes Sociales</h3>
          <div class="flex flex-wrap gap-4">
            <a
              href={socialMedia.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href={socialMedia.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center space-x-2 text-pink-600 hover:text-pink-800"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div class="mt-8">
          <a
            href={`https://wa.me/${socialMedia.whatsapp.number}?text=${encodeURIComponent(socialMedia.whatsapp.message)}`}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.4 3.6C18.2 1.3 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.5 4.2 1.4 6L0 24l6.2-1.4c1.8.9 3.8 1.4 5.8 1.4 6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.6-8.4zM12 22c-1.8 0-3.6-.5-5.2-1.4l-.4-.2-3.8.9.9-3.8-.2-.4C2.5 15.6 2 13.8 2 12 2 6.5 6.5 2 12 2c2.6 0 5 1 6.8 2.8C20.6 6.6 21.6 9 21.6 12c0 5.5-4.5 10-9.6 10zm5.2-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.1-.2.2-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.4.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.3-.6-.6-.5-.8-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.2-.1-.3-.4-.4z"/>
            </svg>
            <span>Contactar por WhatsApp</span>
          </a>
        </div>
        
        <div class="mt-12">
          <h2 class="text-2xl font-semibold mb-6 text-primary">Horario de Atención</h2>
          <div class="space-y-2">
            <div class="flex justify-between items-center py-2 border-b">
              <span class="font-medium">{businessInfo.schedule.weekdays.days}</span>
              <span class="text-primary">{businessInfo.schedule.weekdays.hours}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b">
              <span class="font-medium">{businessInfo.schedule.sunday.days}</span>
              <span class="text-red-500">{businessInfo.schedule.sunday.hours}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>