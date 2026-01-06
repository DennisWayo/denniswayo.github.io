---
layout: page
permalink: /wayo/
title: wayo.ai
description: Major project Python scripts that have been peer-reviewed and published or accepted.
nav: true
nav_order: 8
---

Below are selected Python frameworks used in major projects that have been peer-reviewed or accepted in academic venues. Each script is linked to its repository and/or GUI (if available), and includes citation information for scholarly use.

---

#### 1. SchroSIM 
[![GitHub](https://img.shields.io/badge/GitHub-SchroSIM-blue?logo=github)](https://github.com/DennisWayo/SchroSIM)

```python
# schrosim/core/circuit.py
import pennylane as qml
import strawberryfields as sf
# Quantum photonic circuit simulator using Gaussian and Fock modes
```
**Cite:** 
```bash
@article{wayoschrosim,
  title={SchroSIM: A Schr{\"o}dinger-Inspired Scalable Quantum Photonic Circuit Simulator for Hardware-Agnostic Quantum Computing},
  author={Wayo, Dennis Delali Kwesi}
}
```

---

#### 2. DifGa–photonics
[![GitHub](https://img.shields.io/badge/GitHub-difga--photonics-blue?logo=github)](https://github.com/DennisWayo/difga-photonics)

```python
# difga-photonics/difga/training.py
import matplotlib.pyplot as plt
from pennylane import numpy as np
import pennylane as qml
from difga.noise import (
    MC_SAMPLES,
    NG_SEED,
)

from difga.config import DEFAULT_INPUT_PARAMS, DEFAULT_PROC_PARAMS, EPS
from difga.cost import cost_mm, cost_sm, cost_mm_ng
from difga.io_utils import savefig, save_log

def train_mm(ip, pp, eta, steps=60, lr=0.06):
    opt = qml.GradientDescentOptimizer(lr)
    params = np.zeros(6, requires_grad=True)
    hist = []
    for _ in range(steps):
        params, loss = opt.step_and_cost(lambda p: cost_mm(p, ip, pp, eta), params)
        hist.append(loss)
    return params, np.array(hist)

def train_sm(r, phi, alpha, eta, steps=60, lr=0.06):
    opt = qml.GradientDescentOptimizer(lr)
    params = np.zeros(3, requires_grad=True)
    hist = []
    for _ in range(steps):
        params, loss = opt.step_and_cost(lambda p: cost_sm(p, r, phi, alpha, eta), params)
        hist.append(loss)
    return params, np.array(hist)

def train_mm_ng(ip, pp, eta, delta_sig, delta_anc, steps=60, lr=0.06, K=32):
    opt = qml.GradientDescentOptimizer(lr)
    params = np.zeros(6, requires_grad=True)
    hist = []
    for _ in range(steps):
        params, loss = opt.step_and_cost(
            lambda p: cost_mm_ng(p, ip, pp, eta, delta_sig, delta_anc, K),
            params
        )
        hist.append(loss)
    return params, np.array(hist)

```
**Cite:**
```bash
@article{wayo2025difga,
  title={DifGa: Differentiable Error Mitigation for Multi-Mode Gaussian and Non-Gaussian Noise in Quantum Photonic Circuits},
  author={Wayo, Dennis Delali Kwesi and Dias, Rodrigo Alves and Goliatt, Leonardo and Groppe, Sven},
  journal={arXiv preprint arXiv:2512.23776},
  year={2025}
}
```
---

#### 3. SBUP³–ultrafast
[![GitHub](https://img.shields.io/badge/GitHub-SBUP³–ultrafast-blue?logo=github)](https://github.com/DennisWayo/sbup3-ultrafast)


```python
# schrosim/core/circuit.py
import pennylane as qml
import strawberryfields as sf
# Quantum photonic circuit simulator using Gaussian and Fock modes
```
**Cite:** Wayo, XXX.