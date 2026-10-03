---
layout: page
title: "PhoQSIM: Learning-augmented photonic compiler"
description: Photonic quantum circuit simulator
img: assets/img/photon-chip2.jpg
importance: 1
category: work
related_publications: true
---


In the emerging field of photonic quantum computing, speed, scalability, and precision define the performance boundary. Classical simulation of photonic quantum circuits is traditionally limited by the exponential cost of modeling bosonic degrees of freedom, the need for nonlinear photonic processes, and hardware–software co-optimization challenges. PhoQSIM—short for Photonic Quantum Simulator—emerges as a response to these challenges, built as a hybrid simulation framework that combines physics-informed photonic circuit models with machine learning surrogates to deliver an efficient, extensible, and future-proof photonic quantum compiler.

PhoQSIM is not merely a simulator. It is a learning-augmented compiler, built to model the entire photonic quantum computing stack, from Gaussian and non-Gaussian resource state preparation, to gates and interferometric networks, and ultimately, to detection and tomography. Leveraging domain-specific representations such as Fock states, displacement/squeezing operations, and Kerr-type nonlinearities, PhoQSIM provides a structured yet flexible way to simulate quantum photonic programs on diverse hardware backends—whether they be continuous-variable optical setups, chip-based integrated photonics, or hybrid quantum photonic architectures.

At its core, PhoQSIM consists of two interwoven layers. The first is a physics-based photonic circuit simulator, rooted in transformations governed by linear optical unitaries and nonlinear evolution equations, including approximations to the nonlinear Schrödinger equation (NLSE) and Heisenberg-picture dynamics. Here, classical simulation meets physics-aware decomposition: components like beam splitters, phase shifters, delay lines, and squeezers are modeled via transformation matrices, while nonlinear crystals and Kerr media are treated using time-propagation methods such as the Split-Step Fourier Method (SSFM). The compiler accepts high-level gate instructions and maps them onto these physically grounded primitives.

The second layer introduces machine learning—specifically, surrogate models trained on physics-informed data generated from the above layer. These surrogates serve as fast approximators for resource-intensive modules, such as state evolution in nonlinear media, coupling-induced phase shifts, or loss modeling in multi-mode interferometers. In future versions, we plan to include Graph Neural Networks (GNNs) to model large optical circuits as graphs, where each node represents a component and edges capture quantum optical connectivity. The surrogate layer also allows backward differentiation, enabling gradient-based optimization for variational photonic circuits or photonic analogues of QAOA, VQE, and quantum kernel methods.

Anticipated results from PhoQSIM will cover both simulation benchmarks and hardware compilation case studies. For Gaussian circuits, we expect PhoQSIM to match analytical predictions from Strawberry Fields and Xanadu’s The Walrus, while offering additional flexibility for modeling hardware imperfections, partial distinguishability, and custom loss profiles. For non-Gaussian circuits—which include cubic phase gates, cat-state encodings, and photon-added/subtracted states—PhoQSIM will go further, providing numerical modeling through statevector evolution, sparse Fock representations, and surrogate modeling where feasible.

Beyond the compiler lies a powerful vision: using PhoQSIM to explore design–performance tradeoffs in photonic quantum computers. What gate fidelity can be expected under realistic waveguide loss? How does coupling mismatch in directional couplers affect circuit depth for fault-tolerant encodings? What nonlinear threshold is required to achieve meaningful non-Gaussianity for quantum advantage? PhoQSIM will help answer these questions by compiling circuits across a range of physical and simulated hardware profiles, with the goal of guiding photonic quantum hardware design through simulation-led insights.

The current prototype of PhoQSIM is being built in Swift, leveraging SwiftUI for interactive visualization, and Metal acceleration for high-performance computing on Apple Silicon hardware. Our choice of Swift is strategic—it offers native GPU-CPU integration, real-time UI interactivity for circuit visualization, and bridges seamlessly with Python-based tools for machine learning (via PythonKit) and quantum circuit design (via interop with PennyLane or Qiskit-style descriptions). The final goal is to produce a hardware-agnostic quantum photonic simulator that can interface with multiple programming paradigms while offering photonics-specific precision.

The compiler will support two operation modes: a forward simulation mode, where users input circuit diagrams and retrieve output state information or measurement probabilities; and an inverse design mode, where target outcomes (e.g., squeezing level, fidelity with GHZ state) are specified, and the system proposes photonic circuit designs to achieve them. This latter mode is particularly promising for variational algorithms, adaptive quantum metrology, and photonic quantum neural networks.

We also plan to integrate quantum datasets into PhoQSIM’s training layer. These will include:
- Simulated datasets of Fock-space photon distributions under various circuit configurations, 
- Experimental datasets (where available) from photonic platforms such as Xanadu Borealis, ORCA Photonics, and Quandela, 
- Synthetic training data generated by solving NLSE and propagation equations with boundary conditions reflective of on-chip photonic devices.

One anticipated highlight of the PhoQSIM project is the Photon-Aware Resource Estimator, a tool within the compiler that provides a cost–performance profile for any compiled circuit. For instance, given a variational algorithm expressed in photonic gates, PhoQSIM will return an estimate of expected fidelity under given loss rates, squeezing budget, and circuit depth—empowering hardware architects to trade off photonic resources with algorithmic expressivity.

Although full benchmarking results are pending, we anticipate PhoQSIM will demonstrate near real-time simulation capabilities for small-to-medium circuits (2–10 modes) and fast surrogate inference for larger circuits (~20+ modes) with machine-learned components. Comparisons with classical simulators like Strawberry Fields, The Walrus, and photonic modules in PennyLane are underway, especially focusing on simulation time, fidelity, scalability, and usability.

PhoQSIM’s development is backed by ongoing research efforts in hybrid quantum–classical algorithm design, quantum photonic hardware modeling, and differentiable simulation. The project is also aligned with strategic academic and industrial partnerships, and forms part of a broader initiative to explore hardware–software codesign in photonic quantum computing.

In future iterations, PhoQSIM will be extended with features such as:
- Multi-photon error correction support via bosonic codes (e.g., cat and GKP), 
- Probabilistic circuit modeling for heralded gates and measurement-induced operations, 
- Photon-number-resolving detection modules with noise modeling, 
- Export options to compile to real hardware APIs, such as Xanadu Cloud or ORCA’s QPUs.

As the field of quantum computing continues to evolve, we believe photonics will play a central role in achieving room-temperature, scalable quantum advantage. PhoQSIM, by providing a robust compiler and simulator tailored to the photonic domain, is positioned to accelerate this future—bridging theoretical models, numerical simulations, and real-world photonic quantum hardware.

The repository will be released on GitHub alongside the preprint titled “PhoQSIM: Learning-Augmented Compiler for Photonic Quantum Circuits”. This site will serve as a living documentation and outreach portal for the community to contribute, test, and shape the next generation of photonic compilers.