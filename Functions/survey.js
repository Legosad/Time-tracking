function selectEmoji(selectedId) {
  
    document.querySelectorAll('.emoji-button').forEach(button => {
      button.classList.remove('selected');
    });
  
    document.getElementById(selectedId).classList.add('selected');
  }