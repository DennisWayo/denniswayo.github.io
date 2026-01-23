---
layout: page
title: publications
description: Recent publications emerging from energy and quantum computing.
nav: true
nav_order: 2
---

![pycharm_difga_project.png](../assets/img/pycharm_difga_project.png)

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
    font-weight: 500;
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
    border: none;
    padding: 1.25rem;
    border-radius: 10px;
    background: #fafafa;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  .date {
    color: #3f51b5;
    font-weight: bold;
    text-decoration: none;
  }

  .hidden {
    display: none;
  }

  .badge {
    background: #b000b5;
    color: white;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 12px;
    display: inline-block;
    margin-bottom: 6px;
  }
</style>

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
    <span class="badge">arXiv Preprint</span>
    <p><strong>Linear optics to scalable photonic quantum computing</strong></p>
    <p><a class="date" href="https://arxiv.org/abs/2501.02513">2025</a></p>
  </div>

  <div class="card quantum-simulation photonics">
    <span class="badge">arXiv Preprint</span>
    <p><strong>Gaussian models to non-Gaussian realms of quantum photonic simulators</strong></p>
    <p><a class="date" href="https://arxiv.org/abs/2502.05245">2025</a></p>
  </div>

  <div class="card quantum-software photonics">
    <span class="badge">TechRxiv</span>
    <p><strong>SchroSIM: A Schrödinger-Inspired Scalable Quantum Photonic Circuit Simulator for Hardware-Agnostic Quantum Computing</strong></p>
    <p><a class="date" href="https://github.com/DennisWayo/SchroSIM">2025</a></p>
  </div>

  <div class="card quantum-error-mitigation photonics">
    <span class="badge">arXiv Preprint</span>
    <p><strong>DifGa: Differentiable Error Mitigation for Multi-Mode Gaussian and Non-Gaussian Noise in Quantum Photonic Circuits</strong></p>
    <p><a class="date" href="https://arxiv.org/abs/2512.23776">2025</a></p>
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