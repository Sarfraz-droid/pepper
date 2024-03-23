export const openModal = (id: string) => {
  (document.getElementById(id) as HTMLDialogElement).showModal();
};

export const closeModal = (id: string) => {
  (document.getElementById(id) as HTMLDialogElement).close();
};
