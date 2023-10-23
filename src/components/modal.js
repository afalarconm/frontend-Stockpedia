const modal = {
    modalElement: null,
  
    // Initialize the modal
    init() {
      this.modalElement = document.getElementById('modal');
      const closeModalBtn = document.getElementById('closeModal');
      closeModalBtn.addEventListener('click', () => this.close());
    },
  
    // Show the modal with the given content
    show(content) {
      const modalContent = this.modalElement.querySelector('.modal-content');
      modalContent.innerHTML = content;
      this.modalElement.style.display = 'block';
    },
  
    // Close the modal
    close() {
      this.modalElement.style.display = 'none';
    },
  
    // Add event listener to the confirm button in the modal
    setConfirmAction(callback) {
      const confirmPurchaseBtn = document.getElementById('confirmPurchaseBtn');
      confirmPurchaseBtn.addEventListener('click', () => {
        callback();
        this.close();
      });
    }
  };
  
  export default modal;
  