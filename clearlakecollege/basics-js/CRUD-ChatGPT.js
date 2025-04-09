import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";

const API_URL = "http://localhost:8080/api/alunos";

export default function AlunosCRUD() {
  const [alunos, setAlunos] = useState([]);
  const [form, setForm] = useState({ id: null, nome: "", telefone: "", email: "", endereco: "" });

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setAlunos(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `${API_URL}/${form.id}` : API_URL;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ id: null, nome: "", telefone: "", email: "", endereco: "" });
    fetchAlunos();
  };

  const handleEdit = (aluno) => {
    setForm(aluno);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchAlunos();
  };

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <Input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
            <Input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} required />
            <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <Input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} required />
            <div className="md:col-span-2 text-right">
              <Button type="submit">{form.id ? "Atualizar" : "Salvar"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunos.map((aluno, index) => (
                <TableRow key={index}>
                  <TableCell>{aluno.nome}</TableCell>
                  <TableCell>{aluno.telefone}</TableCell>
                  <TableCell>{aluno.email}</TableCell>
                  <TableCell>{aluno.endereco}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => handleEdit(aluno)}>Editar</Button>
                      <Button variant="destructive" onClick={() => handleDelete(aluno.id)}>Deletar</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
