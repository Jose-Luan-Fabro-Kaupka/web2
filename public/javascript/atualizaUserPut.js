function submitForm() {
    const form = document.getElementById('updateForm');
    const userId = document.getElementById('userId').value;
    const formData = new FormData(form);

    fetch(`/usuarios/${userId}`, {
        method: 'PUT',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar usuário');
            }
            return response.json();
        })
        .then(data => {
            console.log('Usuário atualizado:', data);
            // Faça qualquer outra ação necessária após a atualização do usuário
        })
        .catch(error => {
            console.error('Erro ao atualizar usuário:', error);
        });
}