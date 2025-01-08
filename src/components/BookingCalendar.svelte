<script>
  import { onMount } from 'svelte';

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

  const API_URL = 'https://beauty-salon-api-7qbr.onrender.com';

  onMount(async () => {
    await getCitas();
  });

  async function getCitas() {
    try {
      const response = await fetch(`${API_URL}/citas/`);
      citas = await response.json();
    } catch (error) {
      console.error('Error al obtener citas:', error);
    }
  }

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

  function getStatusColor(status) {
    const colors = {
      'pendiente': '#FFA500',
      'en_curso': '#4CAF50',
      'finalizado': '#2196F3',
      'cancelado': '#f44336'
    };
    return colors[status] || '#757575';
  }
</script>

<div class="booking-system">
  <div class="form-container">
    <h2 class="form-title">{editando ? 'Editar Cita' : 'Nueva Cita'}</h2>
    
    <form on:submit|preventDefault={handleSubmit} class="booking-form">
      <div class="form-group">
        <label for="nombre_cliente">Nombre del Cliente</label>
        <input 
          type="text" 
          id="nombre_cliente" 
          bind:value={formData.nombre_cliente} 
          required
          placeholder="Ingrese el nombre del cliente"
        />
      </div>

      <div class="form-group">
        <label for="servicio">Servicio</label>
        <input 
          type="text" 
          id="servicio" 
          bind:value={formData.servicio} 
          required
          placeholder="Ingrese el servicio"
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="fecha">Fecha</label>
          <input 
            type="date" 
            id="fecha" 
            bind:value={formData.fecha} 
            required
          />
        </div>

        <div class="form-group">
          <label for="hora">Hora</label>
          <input 
            type="time" 
            id="hora" 
            bind:value={formData.hora} 
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label for="estatus">Estatus</label>
        <select id="estatus" bind:value={formData.estatus} class="status-select">
          <option value="pendiente">Pendiente</option>
          <option value="en_curso">En Curso</option>
          <option value="finalizado">Finalizado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn btn-primary">
          {editando ? 'Actualizar Cita' : 'Crear Cita'}
        </button>
        {#if editando}
          <button type="button" class="btn btn-secondary" on:click={resetForm}>
            Cancelar
          </button>
        {/if}
      </div>
    </form>
  </div>

  <div class="appointments-container">
    <h2 class="appointments-title">Lista de Citas</h2>
    <div class="appointments-grid">
      {#each citas as cita}
        <div class="appointment-card">
          <div class="appointment-header" style="background-color: {getStatusColor(cita.estatus)}">
            <span class="status-badge">{cita.estatus}</span>
          </div>
          <div class="appointment-body">
            <div class="appointment-info">
              <h3>{cita.nombre_cliente}</h3>
              <p class="service">{cita.servicio}</p>
              <div class="datetime">
                <span class="date">{cita.fecha}</span>
                <span class="time">{cita.hora}</span>
              </div>
            </div>
            <div class="appointment-actions">
              <button class="btn btn-edit" on:click={() => editCita(cita)}>
                Editar
              </button>
              <button class="btn btn-delete" on:click={() => deleteCita(cita.id)}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .booking-system {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }

  .form-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .form-title, .appointments-title {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .booking-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  label {
    color: #4a5568;
    font-weight: 500;
    font-size: 0.9rem;
  }

  input, select {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input:focus, select:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }

  .status-select {
    background-color: white;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }

  .btn-primary {
    background-color: #4299e1;
    color: white;
  }

  .btn-primary:hover {
    background-color: #3182ce;
  }

  .btn-secondary {
    background-color: #e2e8f0;
    color: #4a5568;
  }

  .btn-secondary:hover {
    background-color: #cbd5e0;
  }

  .appointments-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .appointment-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }

  .appointment-card:hover {
    transform: translateY(-2px);
  }

  .appointment-header {
    padding: 1rem;
    color: white;
  }

  .status-badge {
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  .appointment-body {
    padding: 1.5rem;
  }

  .appointment-info h3 {
    margin: 0;
    color: #2d3748;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .service {
    color: #4a5568;
    margin: 0.5rem 0;
  }

  .datetime {
    display: flex;
    gap: 1rem;
    color: #718096;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  .appointment-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .btn-edit {
    background-color: #4299e1;
    color: white;
    padding: 0.5rem 1rem;
  }

  .btn-delete {
    background-color: #f56565;
    color: white;
    padding: 0.5rem 1rem;
  }

  .btn-edit:hover {
    background-color: #3182ce;
  }

  .btn-delete:hover {
    background-color: #e53e3e;
  }

  @media (max-width: 768px) {
    .booking-system {
      padding: 1rem;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .appointments-grid {
      grid-template-columns: 1fr;
    }
  }
</style>