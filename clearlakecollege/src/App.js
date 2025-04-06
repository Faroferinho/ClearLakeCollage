import './App.css';
import { useState, useEffect } from 'react';

export default function(){
  const [students, setStudents] = useState({nome: "", telefone: "", email: "", endereco: ""});
  
}

useEffect(() => {
  fetch("http://localhost:8081/projeto/api/v1/aluno").then((res) => res.json()).then((data) => setStudent(data));
}, [])