<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-10 px-4 sm:px-6 lg:px-8 relative">
    <div class="absolute inset-0 z-0 opacity-5 pattern-dots pattern-amber-800 pattern-bg-transparent pattern-size-4"></div>

    <div class="relative z-10 max-w-3xl mx-auto bg-white bg-opacity-95 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden animate-fade-in">
      <div class="bg-gradient-to-r from-amber-500 to-red-500 py-6 px-6">
        <h1 class="text-3xl font-bold text-white text-center">Editar Leyenda</h1>
      </div>

      <div class="p-8">
        <Notification :message="error" :isError="true" v-if="error" />
        <div v-if="loading" class="flex items-center justify-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          <span class="ml-3 text-amber-800 font-medium">Cargando...</span>
        </div>

        <form v-if="leyendaData" @submit.prevent="editarLeyenda" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseInput v-model="leyendaData.name" label="Nombre" placeholder="Ingrese el nombre" />
          <BaseInput v-model="leyendaData.category" label="Categoría" placeholder="Ingrese la categoría" />
          <BaseInput v-model="leyendaData.province" label="Provincia" placeholder="Ingrese la provincia" />
          <BaseInput v-model="leyendaData.canton" label="Cantón" placeholder="Ingrese el cantón" />
          <BaseInput v-model="leyendaData.district" label="Distrito" placeholder="Ingrese el distrito" />
          <BaseInput v-model="leyendaData.created_at" label="Fecha de Creación" type="datetime-local" />
          <BaseInput v-model="leyendaData.image_url" label="Imagen (URL)" placeholder="Ingrese la URL de la imagen" />

          <!-- 📌 Nueva sección: Imagen centrada y Descripción debajo -->
          <div class="md:col-span-2 flex flex-col items-center justify-center gap-4">
            <!-- Imagen centrada -->
            <div class="w-full flex justify-center">
              <BaseImagePreview :src="leyendaData.image_url" class="w-full max-w-md" />
            </div>

            <!-- Descripción debajo de la imagen -->
            <div class="w-full">
              <BaseTextArea v-model="leyendaData.description" label="Descripción" placeholder="Ingrese la descripción" />
            </div>
          </div>
          <!-- 📌 Fin de la nueva sección -->

          <div class="md:col-span-2 flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <BaseButton type="submit" variant="primary">Guardar Cambios</BaseButton>
            <BaseButton @click="confirmarCancelacion" variant="secondary">Cancelar</BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getLegendById, updateLegend } from "../services/api";
import Swal from "sweetalert2";
import BaseInput from "../components/input/BaseInput.vue";
import BaseTextArea from "../components/input/BaseTextArea.vue";
import BaseImagePreview from "../components/image/BaseImagePreview.vue";
import BaseButton from "../components/button/BaseButton.vue";
import Notification from "../components/notification/Notification.vue";

export default {
  name: "LeyendaEdit",
  components: { BaseInput, BaseTextArea, BaseImagePreview, BaseButton, Notification },
  props: ["id"],
  data() {
    return {
      leyendaData: null,
      loading: true,
      error: null,
    };
  },
  async mounted() {
    try {
      const response = await getLegendById(this.id);
      this.leyendaData = response.data;
    } catch (err) {
      this.error = "No se pudo cargar la leyenda";
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async editarLeyenda() {
      this.error = null;
      try {
        await updateLegend(this.id, this.leyendaData);
        Swal.fire({
          title: "¡Éxito!",
          text: "La leyenda ha sido actualizada con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#f59e0b",
        }).then(() => {
          this.$router.push("/");
        });
      } catch (err) {
        this.error = "Hubo un problema al actualizar la leyenda";
      }
    },
    confirmarCancelacion() {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Perderás los cambios si cancelas la edición.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "No, continuar editando",
        confirmButtonColor: "#f59e0b",
        cancelButtonColor: "#6b7280",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/");
        }
      });
    },
  },
};
</script>
