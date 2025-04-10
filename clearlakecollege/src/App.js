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
    <div>
      
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
      
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
      
      <div class="container-fluid p-5 bg-dark text-white text-center">
        <p className='h1'>Cadastro</p>
        
        <p className='h5'>Insira o nome de Novos Alunos</p>

        <div>
          
          <input type='text' placeholder='Nome' value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})}/><br/>
          
          <input type='text' placeholder='Telefone' value={form.telefone} onChange={(e) => setForm({...form, telefone: e.target.value})}/><br/>
          
          <input type='text' placeholder='E-mail' value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/><br/>
          
          <input type='text' placeholder='Endereço' value={form.endereco} onChange={(e) => setForm({...form, endereco: e.target.value})}/><br/>
          
          <button button type="button" class="btn btn-primary" onClick={handleSubmit}>
            {edition ? "Atualizar" : "Adicionar"}
          </button>

        </div>

      </div>

      <div class="table">
        <h1>Lista de Alunos</h1>
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
                <button type="button" class="btn btn-info" onClick={() => handleEdit(stu)}>🖋️</button>
                <button type="button" class="btn btn-danger" onClick={() => handleDelete(stu.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    </div>

    
  );
}
