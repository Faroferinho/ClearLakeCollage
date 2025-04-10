import './App.css';
import { useState, useEffect } from 'react';

const API_URL = "http://localhost:8081/projeto/api/v1/aluno";

export default function StudentsCRUD(){
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({nome: "", telefone: "", email: "", endereco: ""});
  const [edition, setEdition] = useState(null);
  
  useEffect(() => {
    fetch(API_URL)
    .then((res)  => res.json())
    .then((data) => setStudents(data));
  }, []);

  const handleSubmit = async () => {
    const newStudent = form;
    const method = edition ? "PUT" : "POST";

    const response = await fetch(API_URL, {
      method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newStudent),
    });

    if(response.ok){
      setStudents(
        edition ? students.map(b => (b.id === edition ? newStudent : b)) : [...students, newStudent]
      );
      setEdition(null);
    }
  };

  const handleEdit = (stu) => {
    setForm(stu);
    setEdition(stu.id);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method : "DELETE" });
    if(response.ok){
      setStudents(students.filter(b => b.id !== id));
    }
  };

  return (
    <div className='background'>
      
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
      
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
      
      <div className="container-fluid p-5  text-white text-center">
        <p className='h1'>Cadastro</p>
        
        <p className='h5'>{edition ? "Atualize os dados de um aluno" : "Insira o nome de Novos Alunos"}</p>

        <div className='container mt-3'>
          <div class="form-floating mb-3 mt-3">
            <input class="form-control" type='text' placeholder='Nome' value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})}/><br/>
            <label for="nome">Nome</label>
          </div>
          
          <div class="form-floating mb-3 mt-3">
            <input class="form-control" type='text' placeholder='Telefone' value={form.telefone} onChange={(e) => setForm({...form, telefone: e.target.value})}/><br/>
            <label for="telefone">Telefone</label>
          </div>
          
          <div class="form-floating mb-3 mt-3">
            <input class="form-control" type='text' placeholder='E-mail' value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/><br/>
            <label for="E-Mail">E-Mail</label>
          </div>
          
          <div class="form-floating mb-3 mt-3">
            <input class="form-control" type='text' placeholder='Endereço' value={form.endereco} onChange={(e) => setForm({...form, endereco: e.target.value})}/><br/>
            <label for="endereco">Endereço</label>
          </div>
          
          <button button type="button" class="btn btn-primary" onClick={handleSubmit}>
            {edition ? "Atualizar" : "Adicionar"}
          </button>

        </div>

      </div>

      <h1 className='text-white'>Lista de Alunos</h1>
      <table class="table table-dark table-borderless">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Endereço</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu, index) => (
            <tr key={index}>
              <td>{stu.nome}</td>
              <td>{stu.telefone}</td>
              <td>{stu.email}</td>
              <td>{stu.endereco}</td>
              <td class="btn-group btn-group-lg">
                <button class="btn btn-info" onClick={() => handleEdit(stu)}>🖋️</button>
                <button class="btn btn-danger" onClick={() => handleDelete(stu.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
}
