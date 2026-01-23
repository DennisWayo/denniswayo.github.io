---
layout: page
permalink: /pub/
title: publications
description: Recent publications emerging from energy and quantum computing.
nav: true
nav_order: 10
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dennis Wayo — Publications</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 0;
      padding: 2rem;
      background: #fff;
      color: #222;
    }

    h1 {
      border-left: 4px solid #b000b5;
      padding-left: 10px;
    }

    .filters {
      margin-bottom: 2rem;
    }

    .filters button {
      margin-right: 10px;
      padding: 0.4em 1em;
      border: none;
      background-color: #eee;
      border-radius: 5px;
      cursor: pointer;
    }

    .filters button.active {
      background-color: #b000b5;
      color: white;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .card {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 6px;
      transition: 0.3s;
    }

    .card:hover {
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .date {
      color: #3f51b5;
      font-weight: bold;
      text-decoration: none;
    }

    .hidden {
      display: none;
    }
  </style>
</head>
<body>

<h1>Publications</h1>

<div class="filters">
    <button class="filter-button active" data-filter="all">All</button>
    <button class="filter-button" data-filter="quantum-computing">Quantum Computing</button>
    <button class="filter-button" data-filter="photonics">Photonic QC</button>
    <button class="filter-button" data-filter="quantum-simulation">Quantum Simulation</button>
    <button class="filter-button" data-filter="quantum-error-mitigation">Error Mitigation</button>
    <button class="filter-button" data-filter="quantum-software">Quantum Software</button>
</div>

<div class="grid" id="publications-grid">

    <div class="card quantum-computing photonics">
      <p><strong>Linear optics to scalable photonic quantum computing</strong></p>
      <p>
        <a class="date" href="https://arxiv.org/abs/2501.02513">
          2025
        </a>
      </p>
    </div>
    
    <div class="card quantum-simulation photonics">
      <p><strong>Gaussian models to non-Gaussian realms of quantum photonic simulators</strong></p>
      <p>
        <a class="date" href="https://arxiv.org/abs/2502.05245">
          2025
        </a>
      </p>
    </div>
    
    <div class="card quantum-software photonics">
      <p><strong>
        SchroSIM: A Schrödinger-Inspired Scalable Quantum Photonic Circuit Simulator for Hardware-Agnostic Quantum Computing
      </strong></p>
      <p>
        <a class="date" href="#">
          2025
        </a>
      </p>
    </div>
    
    <div class="card quantum-error-mitigation photonics">
      <p><strong>
        DifGa: Differentiable Error Mitigation for Multi-Mode Gaussian and Non-Gaussian Noise in Quantum Photonic Circuits
      </strong></p>
      <p>
        <a class="date" href="https://arxiv.org/abs/2512.23776">
          2025
        </a>
      </p>
    </div>

</div>

<script>
  const buttons = document.querySelectorAll('.filter-button');
  const cards = document.querySelectorAll('.card');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      cards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
</script>

</body>
</html>