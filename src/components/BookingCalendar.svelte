<script>
  import { onMount } from 'svelte';

  // Estado para almacenar las citas y el formulario
  let citas = [];
  let formData = {
    nombre_cliente: '',
    servicio: '',
    fecha: '',
    hora: '',
    estatus: 'pendiente'
  };
  let editando = false;
  let citaId = null;

  // URL base de la API
  const API_URL = 'https://beauty-salon-api-7qbr.onrender.com';

  // Cargar citas al montar el componente
  onMount(async () => {
    await getCitas();
  });

  // Obtener todas las citas
  async function getCitas() {
    try {
      const response = await fetch(`${API_URL}/citas/`);
      citas = await response.json();
    } catch (error) {
      console.error('Error al obtener citas:', error);
    }
  }

  // Crear o actualizar cita
  async function handleSubmit() {
    try {
      const url = editando 
        ? `${API_URL}/citas/${citaId}` 
        : `${API_URL}/citas/`;
      
      const method = editando ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        resetForm();
        await getCitas();
      }
    } catch (error) {
      console.error('Error al guardar cita:', error);
    }
  }

  // Eliminar cita
  async function deleteCita(id) {
    if (confirm('¿Estás seguro de eliminar esta cita?')) {
      try {
        const response = await fetch(`${API_URL}/citas/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          await getCitas();
        }
      } catch (error) {
        console.error('Error al eliminar cita:', error);
      }
    }
  }

  // Preparar formulario para edición
  function editCita(cita) {
    editando = true;
    citaId = cita.id;
    formData = {
      nombre_cliente: cita.nombre_cliente,
      servicio: cita.servicio,
      fecha: cita.fecha,
      hora: cita.hora,
      estatus: cita.estatus
    };
  }

  // Resetear formulario
  function resetForm() {
    editando = false;
    citaId = null;
    formData = {
      nombre_cliente: '',
      servicio: '',
      fecha: '',
      hora: '',
      estatus: 'pendiente'
    };
  }
</script>

<div class="booking-calendar">
  <h2>{editando ? 'Editar Cita' : 'Nueva Cita'}</h2>
  
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="nombre_cliente">Nombre del Cliente:</label>
      <input 
        type="text" 
        id="nombre_cliente" 
        bind:value={formData.nombre_cliente} 
        required
      />
    </div>

    <div>
      <label for="servicio">Servicio:</label>
      <input 
        type="text" 
        id="servicio" 
        bind:value={formData.servicio} 
        required
      />
    </div>

    <div>
      <label for="fecha">Fecha:</label>
      <input 
        type="date" 
        id="fecha" 
        bind:value={formData.fecha} 
        required
      />
    </div>

    <div>
      <label for="hora">Hora:</label>
      <input 
        type="time" 
        id="hora" 
        bind:value={formData.hora} 
        required
      />
    </div>

    <div>
      <label for="estatus">Estatus:</label>
      <select id="estatus" bind:value={formData.estatus}>
        <option value="pendiente">Pendiente</option>
        <option value="en_curso">En Curso</option>
        <option value="finalizado">Finalizado</option>
        <option value="cancelado">Cancelado</option>
      </select>
    </div>

    <div class="buttons">
      <button type="submit">{editando ? 'Actualizar' : 'Crear'}</button>
      {#if editando}
        <button type="button" on:click={resetForm}>Cancelar</button>
      {/if}
    </div>
  </form>

  <h2>Lista de Citas</h2>
  <div class="citas-list">
    {#each citas as cita}
      <div class="cita-item">
        <p><strong>Cliente:</strong> {cita.nombre_cliente}</p>
        <p><strong>Servicio:</strong> {cita.servicio}</p>
        <p><strong>Fecha:</strong> {cita.fecha}</p>
        <p><strong>Hora:</strong> {cita.hora}</p>
        <p><strong>Estatus:</strong> {cita.estatus}</p>
        <div class="actions">
          <button on:click={() => editCita(cita)}>Editar</button>
          <button on:click={() => deleteCita(cita.id)}>Eliminar</button>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .booking-calendar {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  .citas-list {
    display: grid;
    gap: 20px;
  }

  .cita-item {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
  }

  .actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  input, select {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
  }

  button {
    padding: 8px 16px;
    cursor: pointer;
  }
</style>