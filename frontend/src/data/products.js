// src/mocks/products.js
import ia from '../assets/books/ia.jpg';
import algorithms from '../assets/books/algorithms.png';
import react from '../assets/books/react.jpg';
import fundamentosbd from '../assets/books/fundamentosbd.jpg';
import codigolimpo from '../assets/books/codigolimpo.jpg';
import edemprofundidade from '../assets/books/edemprofundidade.webp';
import ml from '../assets/books/ml.jpg';
import arqsoftwaremoderna from '../assets/books/arqsoftwaremoderna.jpg';
import pythonanalise from '../assets/books/pythonanalise.jpg';
import deeplearning from '../assets/books/deeplearningtensorflow.jpg';
import designpatterns from '../assets/books/designpatternsjava.webp';
import nosql from '../assets/books/nosqlessencial.jpg';
import kubernetes from '../assets/books/kubernetes.jpg';
import docker from '../assets/books/docker.jpg';
import segurancaweb from '../assets/books/segurancaweb.jpg';
import js from '../assets/books/js.jpg';
import cloudcomputing from '../assets/books/cloudcomputing.jpg';
import cienciadedados from '../assets/books/cienciadedados.jpg';
import requisitos from '../assets/books/requisitios.jpg';
import analiser from '../assets/books/analiser.jpg';

export const mockProducts = [
  {
    id: 1,
    title: "Introdução à Inteligência Artificial",
    author: "Maria Silva",
    description: "Fundamentos de IA, machine learning e redes neurais.",
    image: ia,
    category: "Inteligência Artificial",
    rating: 4.5,
    formats: [
      { sku: "IA-PHY-001", type: "Físico", price: 89.9, stock: 15 },
      { sku: "IA-EBO-001", type: "E-book", price: 59.9, stock: null },
    ],
  },
  {
    id: 2,
    title: "Algoritmos Modernos",
    author: "João Souza",
    description: "Estruturas de dados e algoritmos de alta performance.",
    image: algorithms,
    category: "Programação",
    rating: 5,
    formats: [
      { sku: "ALG-PHY-002", type: "Físico", price: 120.0, stock: 8 },
      { sku: "ALG-EBO-002", type: "E-book", price: 79.9, stock: null },
    ],
  },
  {
    id: 3,
    title: "React: Guia Definitivo",
    author: "Ana Pereira",
    description: "Construção de interfaces modernas com React.",
    image: react,
    category: "Programação",
    rating: 4.8,
    formats: [
      { sku: "RCT-PHY-003", type: "Físico", price: 95.5, stock: 22 },
      { sku: "RCT-EBO-003", type: "E-book", price: 65.5, stock: null },
    ],
  },
  {
    id: 4,
    title: "Fundamentos de Banco de Dados",
    author: "Carlos Costa",
    description: "Modelagem de dados, SQL e NoSQL.",
    image: fundamentosbd,
    category: "Banco de Dados",
    rating: 4.2,
    formats: [
      { sku: "DB-PHY-004", type: "Físico", price: 75.0, stock: 0 },
      { sku: "DB-EBO-004", type: "E-book", price: 49.9, stock: null },
    ],
  },
  {
    id: 5,
    title: "Código Limpo",
    author: "Robert C. Martin (Uncle Bob)",
    description: "Como escrever código legível e manutenível.",
    image: codigolimpo,
    category: "Engenharia de Software",
    rating: 4.9,
    formats: [
      { sku: "CLC-PHY-005", type: "Físico", price: 119.9, stock: 35 },
      { sku: "CLC-EBO-005", type: "E-book", price: 79.9, stock: null },
    ],
  },
  {
    id: 6,
    title: "Estruturas de Dados em Profundidade",
    author: "Fernanda Oliveira",
    description: "Principais estruturas de dados aplicadas em software.",
    image: edemprofundidade,
    category: "Programação",
    rating: 4.3,
    formats: [
      { sku: "DS-PHY-006", type: "Físico", price: 85.0, stock: 10 },
      { sku: "DS-EBO-006", type: "E-book", price: 55.0, stock: null },
    ],
  },
  {
    id: 7,
    title: "Machine Learning Avançado",
    author: "Luiz Carvalho",
    description: "Visão computacional e NLP com ML moderno.",
    image: ml,
    category: "Inteligência Artificial",
    rating: 4.7,
    formats: [
      { sku: "ML-PHY-007", type: "Físico", price: 135.0, stock: 12 },
      { sku: "ML-EBO-007", type: "E-book", price: 95.0, stock: null },
    ],
  },
  {
    id: 8,
    title: "Arquitetura de Software Moderna",
    author: "Ricardo Mendes",
    description: "Sistemas escaláveis e resilientes.",
    image: arqsoftwaremoderna,
    category: "Engenharia de Software",
    rating: 4.6,
    formats: [
      { sku: "AS-PHY-008", type: "Físico", price: 110.0, stock: 18 },
      { sku: "AS-EBO-008", type: "E-book", price: 70.0, stock: null },
    ],
  },
  {
    id: 9,
    title: "Python para Ciência de Dados",
    author: "Juliana Rocha",
    description: "Pandas, NumPy e visualização de dados.",
    image: pythonanalise,
    category: "Ciência de Dados",
    rating: 4.4,
    formats: [
      { sku: "PYD-PHY-009", type: "Físico", price: 99.9, stock: 20 },
      { sku: "PYD-EBO-009", type: "E-book", price: 69.9, stock: null },
    ],
  },
  {
    id: 10,
    title: "Deep Learning com TensorFlow",
    author: "Gabriel Lima",
    description: "Redes neurais modernas aplicadas em visão e texto.",
    image: deeplearning,
    category: "Inteligência Artificial",
    rating: 4.8,
    formats: [
      { sku: "DL-PHY-010", type: "Físico", price: 140.0, stock: 14 },
      { sku: "DL-EBO-010", type: "E-book", price: 95.0, stock: null },
    ],
  },
  {
    id: 11,
    title: "Design Patterns em Java",
    author: "André Ferreira",
    description: "Padrões de projeto aplicados em Java.",
    image: designpatterns,
    category: "Engenharia de Software",
    rating: 4.5,
    formats: [
      { sku: "DP-PHY-011", type: "Físico", price: 105.0, stock: 9 },
      { sku: "DP-EBO-011", type: "E-book", price: 72.0, stock: null },
    ],
  },
  {
    id: 12,
    title: "NoSQL Essencial",
    author: "Camila Duarte",
    description: "MongoDB, Cassandra e bancos não relacionais.",
    image: nosql,
    category: "Banco de Dados",
    rating: 4.1,
    formats: [
      { sku: "NS-PHY-012", type: "Físico", price: 88.0, stock: 7 },
      { sku: "NS-EBO-012", type: "E-book", price: 55.0, stock: null },
    ],
  },
  {
    id: 13,
    title: "Kubernetes em Ação",
    author: "Paulo Gomes",
    description: "Orquestração de containers em larga escala.",
    image: kubernetes,
    category: "DevOps",
    rating: 4.6,
    formats: [
      { sku: "K8S-PHY-013", type: "Físico", price: 125.0, stock: 13 },
      { sku: "K8S-EBO-013", type: "E-book", price: 82.0, stock: null },
    ],
  },
  {
    id: 14,
    title: "Docker para Desenvolvedores",
    author: "Rafael Nunes",
    description: "Criação e gerenciamento de containers Docker.",
    image: docker,
    category: "DevOps",
    rating: 4.3,
    formats: [
      { sku: "DOC-PHY-014", type: "Físico", price: 98.0, stock: 25 },
      { sku: "DOC-EBO-014", type: "E-book", price: 64.0, stock: null },
    ],
  },
  {
    id: 15,
    title: "Segurança em Aplicações Web",
    author: "Marcos Vieira",
    description: "Proteção contra ataques e melhores práticas.",
    image: segurancaweb,
    category: "Segurança",
    rating: 4.7,
    formats: [
      { sku: "SEC-PHY-015", type: "Físico", price: 112.0, stock: 11 },
      { sku: "SEC-EBO-015", type: "E-book", price: 74.0, stock: null },
    ],
  },
  {
    id: 16,
    title: "JavaScript Moderno",
    author: "Beatriz Campos",
    description: "ECMAScript, async/await e boas práticas.",
    image: js,
    category: "Programação",
    rating: 4.5,
    formats: [
      { sku: "JSM-PHY-016", type: "Físico", price: 85.0, stock: 19 },
      { sku: "JSM-EBO-016", type: "E-book", price: 58.0, stock: null },
    ],
  },
  {
    id: 17,
    title: "Análise de Dados com R",
    author: "Helena Torres",
    description: "Estatística e visualização com R.",
    image: analiser,
    category: "Ciência de Dados",
    rating: 4.2,
    formats: [
      { sku: "R-PHY-017", type: "Físico", price: 92.0, stock: 6 },
      { sku: "R-EBO-017", type: "E-book", price: 61.0, stock: null },
    ],
  },
  {
    id: 18,
    title: "Cloud Computing Essencial",
    author: "Felipe Moreira",
    description: "AWS, Azure e GCP na prática.",
    image: cloudcomputing,
    category: "Infraestrutura",
    rating: 4.4,
    formats: [
      { sku: "CLD-PHY-018", type: "Físico", price: 130.0, stock: 17 },
      { sku: "CLD-EBO-018", type: "E-book", price: 89.0, stock: null },
    ],
  },
  {
    id: 19,
    title: "Introdução à Ciência de Dados",
    author: "Tatiana Lopes",
    description: "Conceitos e técnicas fundamentais da área.",
    image: cienciadedados,
    category: "Ciência de Dados",
    rating: 4.3,
    formats: [
      { sku: "DSC-PHY-019", type: "Físico", price: 99.0, stock: 20 },
      { sku: "DSC-EBO-019", type: "E-book", price: 66.0, stock: null },
    ],
  },
  {
    id: 20,
    title: "Engenharia de Requisitos",
    author: "Carolina Almeida",
    description: "Levantamento e documentação de requisitos de software.",
    image: requisitos,
    category: "Engenharia de Software",
    rating: 4.1,
    formats: [
      { sku: "REQ-PHY-020", type: "Físico", price: 87.0, stock: 14 },
      { sku: "REQ-EBO-020", type: "E-book", price: 59.0, stock: null },
    ],
  },
];
