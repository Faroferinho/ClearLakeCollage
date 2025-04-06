import './App.css';
import { useState, useEffect } from 'react';

export default function(){
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({nome: "", telefone: "", email: "", endereco: ""});
  const [edition, setEdition] = useState(null);
  
  useEffect(() => {
    fetch("http://localhost:8081/projeto/api/v1/aluno")
    .then((res) => res.json()).then((data) => setStudents(data));
  }, []);

  const handleSubmit = async () => {
    const newStudent = student;
    const method = edition ? "PUT" : "POST";
    const url = "http://localhost:8081/projeto/api/v1/aluno";

    const response = await fetch(url, {
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
  }
}
