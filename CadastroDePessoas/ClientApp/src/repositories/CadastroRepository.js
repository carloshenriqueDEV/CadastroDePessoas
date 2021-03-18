export async function DeleteCadastro(id) {
    const response = await fetch('cadastro/' + id, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    if (data.status == 200) {
        return data.payload;
    }
    alert(JSON.stringify(data.errors));    
}

export async function CreateCadastro(cadastro) {
    cadastro.pessoaId = 0;
    const response = await fetch('cadastro/', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(cadastro),
    });
    const data = await response.json();
    console.log(data)
    if (data.status == 200) {
        return data.payload;
    }
    alert(JSON.stringify(data.errors));
}

export async function UpdateCadastro(cadastro) {
    const response = await fetch('cadastro/' + cadastro.pessoaId, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(cadastro),
    });
    const data = await response.json();
    console.log(data)
    if (data.status == 200) {
        return data.payload;
    }
    alert(JSON.stringify(data.errors));
}

export async function GetTabelaCadastro() {
    const response = await fetch('cadastro');
    const data = await response.json();
    if (data.status == 200) {
        return data.payload;
    }
    alert(JSON.stringify(data.errors));
}
