export async function DeleteCadastro(id) {
    const response = await fetch('cadastro/' + id, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return data.payload;
}


export async function GetTabelaCadastro() {
    const response = await fetch('cadastro');
    const data = await response.json();
    return data;

}
