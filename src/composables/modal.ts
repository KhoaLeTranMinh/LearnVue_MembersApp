import { ref, shallowRef, type Component } from "vue";
import AddMemberForm from '@/components/AddMemberForm.vue';

const show = ref(false);
const component = shallowRef();

export function useModal() {
  return {
    show,
    component,
    showModal: () => {
      show.value = true
      component.value = AddMemberForm
    },
    hideModal: () => (show.value = false),
  };
}
