import { useEffect, useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

const tabs = [
  { label: 'about', path: '/about' },
  { label: 'projects', path: '/projects' },
  { label: 'blog', path: '/blog' },
  { label: 'publications', path: '/publications' },
  { label: 'mentoring', path: '/mentoring' },
  { label: 'colabX', path: '/colabx' },
  { label: 'software', path: '/software' },
  { label: 'wayo.ai', path: '/wayo-ai' },
  { label: 'talKs', path: '/talks' },
]

const footerContacts = [
  {
    label: 'Email',
    href: 'mailto:dwayo3@gatech.edu',
    icon: '/icon-mail.svg',
    square: true,
  },
  {
    label: 'Telegram',
    href: 'https://telegram.me/deepnerds',
    icon: 'https://cdn.simpleicons.org/telegram/FFFFFF',
    external: true,
  },
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send/?phone=77714140389&text&type=phone_number&app_absent=0',
    icon: 'https://cdn.simpleicons.org/whatsapp/FFFFFF',
    external: true,
  },
  {
    label: 'ORCID',
    href: 'https://orcid.org/0000-0001-9980-6247',
    icon: 'https://cdn.simpleicons.org/orcid/FFFFFF',
    external: true,
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?hl=en&user=YCXIi1wAAAAJ&view_op=list_works&sortby=pubdate',
    icon: 'https://cdn.simpleicons.org/googlescholar/FFFFFF',
    external: true,
  },
  {
    label: 'Scopus',
    href: 'https://www.scopus.com/authid/detail.uri?authorId=57890228100',
    icon: 'https://cdn.simpleicons.org/scopus/FFFFFF',
    square: true,
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/DennisWayo',
    icon: 'https://cdn.simpleicons.org/github/FFFFFF',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dennis-wayo-765a38b1/',
    icon: '/icon-li.svg',
    square: true,
    external: true,
  },
  {
    label: 'X',
    href: 'https://x.com/DennisWayogh',
    icon: 'https://cdn.simpleicons.org/x/FFFFFF',
    square: true,
    external: true,
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@iwayoden',
    icon: '/icon-md.svg',
    external: true,
  },
]

const headerMedia = {
  video: '/pinterest-header.mp4',
  poster: '/pinterest-header.jpg',
}

const publications = [
  {
    key: 'racs-2026',
    year: 2026,
    title:
      'RaCS: Near-Zero-Error Classical Data Encoding on Photonic Quantum Processors via Redundancy-Assisted Coherent-State Codes',
    citation: 'Wayo, D.D.K., & Groppe, S. (2026). Fortschritte der Physik.',
    paperUrl:
      'https://scholar.google.com/scholar?q=RaCS%3A+Near-Zero-Error+Classical+Data+Encoding+on+Photonic+Quantum+Processors+via+Redundancy-Assisted+Coherent-State+Codes',
    paperLabel: 'Open Paper',
    abstract:
      'Presents a redundancy-assisted coherent-state coding strategy for reliable classical data encoding on photonic quantum hardware with near-zero observed error under defined noise assumptions.',
  },
  {
    key: 'decoder-dependence-2026',
    year: 2026,
    title:
      'Decoder Dependence in Surface-Code Threshold Estimation with Native Gottesman-Kitaev-Preskill Digitization and Parallelized Sampling',
    citation: 'Wayo, D.D.K., Onah, C., Goliatt, L., & Groppe, S. (2026). arXiv:2603.25757.',
    paperUrl: 'https://arxiv.org/abs/2603.25757',
    paperLabel: 'Open arXiv',
    abstract:
      'Analyzes how decoder choice changes threshold claims under native GKP digitization, using parallelized sampling pipelines to isolate algorithmic effects from simulation artifacts.',
  },
  {
    key: 'decoder-performance-2026',
    year: 2026,
    title: 'Decoder Performance in Hybrid CV-Discrete Surface-Code Threshold Estimation Using LiDMaS+',
    citation: 'Wayo, D.D.K., Onah, C., Goliatt, L., & Groppe, S. (2026). arXiv:2603.06730.',
    paperUrl: 'https://arxiv.org/abs/2603.06730',
    paperLabel: 'Open arXiv',
    abstract:
      'Benchmarks decoder behavior in hybrid continuous-variable and discrete surface-code regimes using LiDMaS+, with controlled replay and cross-decoder comparability metrics.',
  },
  {
    key: 'ultrafast-photonic-2025',
    year: 2025,
    title:
      'Simulation of Ultrafast Photonic Circuits via Nonlinear Schrodinger Dynamics and Quantum Detector Modeling',
    citation: 'Wayo, D.D.K. (2025). Optical and Quantum Electronics.',
    paperUrl: 'https://doi.org/10.1007/s11082-026-08700-y',
    paperLabel: 'Open Journal',
    abstract:
      'Builds a simulation framework coupling nonlinear propagation and detector-level modeling to study ultrafast photonic-circuit behavior across realistic operating conditions.',
  },
  {
    key: 'rare-earth-2025',
    year: 2025,
    title: 'Atomistic Modeling of Rare Earth Ions in Photonic Materials',
    citation: 'Wayo, D.D.K., et al. (2025). Luminescence.',
    paperUrl:
      'https://scholar.google.com/scholar?q=Atomistic+Modeling+of+Rare+Earth+Ions+in+Photonic+Materials',
    paperLabel: 'Open Paper',
    abstract:
      'Investigates atomistic structure-property relationships of rare-earth ions in photonic host materials to improve emitter design and optical response prediction.',
  },
  {
    key: 'graph-pinn-2025',
    year: 2025,
    title: 'Ensembles of Graph and Physics-Informed Machine Learning for Scientific Modeling',
    citation: 'Wayo, D.D.K. (2025). Archives of Computational Methods in Engineering.',
    paperUrl:
      'https://scholar.google.com/scholar?q=Ensembles+of+Graph+and+Physics-Informed+Machine+Learning+for+Scientific+Modeling',
    paperLabel: 'Open Paper',
    abstract:
      'Combines graph-based models and physics-informed learning into ensemble workflows that improve robustness and predictive consistency in scientific computation tasks.',
  },
  {
    key: 'qdftnet-2025',
    year: 2025,
    title: 'Q-DFTNet: Chemistry-Informed Neural Network for Molecular Dipole Prediction',
    citation: 'Wayo, D.D.K., et al. (2025). Journal of Computational Chemistry.',
    paperUrl: 'https://doi.org/10.1002/jcc.70206',
    paperLabel: 'Open Journal',
    abstract:
      'Introduces a chemistry-informed neural architecture for molecular dipole estimation that encodes domain constraints to stabilize training and improve generalization.',
  },
  {
    key: 'schrosim-2025',
    year: 2025,
    title: 'SchroSIM: Scalable Quantum Photonic Circuit Simulator',
    citation: 'Wayo, D.D.K. (2025). TechRxiv.',
    paperUrl: 'https://scholar.google.com/scholar?q=SchroSIM%3A+Scalable+Quantum+Photonic+Circuit+Simulator',
    paperLabel: 'Open Paper',
    abstract:
      'Describes a scalable simulator architecture for quantum photonic circuits with modular execution paths that separate compilation, numerical backends, and hardware mapping.',
  },
]

const softwareShowcase = [
  {
    name: 'SchroSIM',
    timeline: 'Open-source photonic simulator',
    creator: 'Created by Dennis Wayo',
    repo: 'https://github.com/DennisWayo/SchroSIM',
    image: '/schrosim.png',
    imageAlt: 'SchroSIM project screenshot',
    introduction:
      'SchroSIM is built as a layered photonic-circuit simulation platform. The core idea is to separate circuit authoring, compilation, numerical execution, and hardware mapping so each step can be optimized independently without locking the simulator to one photonic stack.',
    mechanism:
      'In practice, SchroSIM routes Gaussian and non-Gaussian operations through different numerical paths. Gaussian blocks are propagated efficiently with symplectic state updates, while non-Gaussian blocks are handled with higher-fidelity Fock-space or tensor-network style routines. This hybrid strategy keeps common workloads fast while preserving support for universal photonic modeling.',
    workflow: [
      'Circuit Definition: the user defines a photonic circuit (gates, parameters, measurements) in the frontend or through script-driven construction.',
      'Compilation to Intermediate Representation: a compiler pass normalizes operations into an IR, validates gate ordering, and partitions Gaussian vs non-Gaussian segments.',
      'Backend Execution: Gaussian segments run through covariance/displacement evolution, while non-Gaussian segments use truncated Fock/tensor routines with optional acceleration paths.',
      'Post-processing and Benchmarks: the runtime reports observables such as fidelity, photon statistics, and entanglement-related diagnostics, then exports artifacts for reproducible comparisons.',
      'Hardware-Abstraction Export: the HAL layer keeps the logical circuit independent from a specific device and can target hardware-facing formats or benchmarking workflows.',
    ],
    outputs: [
      'Hardware-agnostic circuit simulation outputs suitable for comparative studies.',
      'Structured metrics for fidelity and photonic state behavior across noise and gate variants.',
      'A plugin-ready surface for future ML-assisted optimization and symbolic-model extensions.',
    ],
  },
  {
    name: 'LiDMaS+ (lidmas_cpp)',
    timeline: 'Open-source QEC benchmarking engine',
    creator: 'Created by Dennis Wayo',
    repo: 'https://github.com/DennisWayo/lidmas_cpp',
    image: '/lidmas.png',
    imageAlt: 'LiDMaS+ project screenshot',
    introduction:
      'LiDMaS+ is a C++20 quantum error-correction research engine focused on deterministic threshold studies and decoder benchmarking. It unifies multiple code families and decoder backends under a common CLI and decoder I/O contract so comparisons remain reproducible and auditable.',
    mechanism:
      'The simulator executes Monte Carlo sweeps under controlled seeds, then pushes syndrome data through decoder adapters (MWPM, UF, neural-MWPM and related workflows). It supports Pauli, hybrid CV-discrete, and GKP-oriented modes, then computes logical-error trends and threshold indicators with confidence-aware analysis.',
    workflow: [
      'Experiment Configuration: select engine (`surface`, `css`, `ldpc`), decoder, noise mode, code distances, trial counts, and random seed from the CLI.',
      'Syndrome Generation: run deterministic sampling over physical noise parameters (`p` or `sigma`) to produce syndrome streams and logical outcomes.',
      'Decoder Evaluation: feed requests through normalized decoder interfaces, including replay pipelines for hardware-to-decoder evaluation via NDJSON artifacts.',
      'Metric Aggregation: compute logical error rates, crossing behavior, and diagnostics across distance/noise sweeps to estimate threshold behavior.',
      'Reproducible Artifact Export: persist outputs in versionable files for reruns, plotting scripts, and cross-decoder validation.',
    ],
    outputs: [
      'Threshold sweep tables and reproducible run artifacts under scripted examples.',
      'Cross-decoder comparability using stable decoder input/output contracts.',
      'Hardware replay traces that connect real syndrome streams to algorithm-level decoder analysis.',
    ],
  },
]

const githubMetrics = [
  {
    title: 'GitHub Profile Card',
    image:
      'https://github-readme-stats.vercel.app/api?username=DennisWayo&show_icons=true&rank_icon=github&include_all_commits=true&hide_border=true&title_color=111111&text_color=2f2f2f&icon_color=111111&bg_color=ffffff',
    alt: 'GitHub profile statistics card for Dennis Wayo',
    href: 'https://github.com/DennisWayo',
    fit: 'contain',
  },
  {
    title: 'Core Languages',
    type: 'core-languages',
    languages: [
      {
        name: 'Rust',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
      },
      {
        name: 'C++',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      },
      {
        name: 'Python',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
      {
        name: 'Julia',
        logo: 'https://cdn.simpleicons.org/julia/9558B2',
      },
      {
        name: 'Swift',
        logo: 'https://cdn.simpleicons.org/swift/F05138',
      },
      {
        name: 'CUDA',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nvidia/nvidia-original.svg',
      },
      {
        name: 'Bash',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
      },
    ],
    note: 'Core stack for simulation, benchmarking, and systems workflows.',
  },
]

const talks = [
  {
    title: 'Decoder Dependence in Surface-Code Threshold Estimation',
    summary:
      'A systems view of how decoder choice and replay methodology change threshold claims and practical interpretation.',
  },
  {
    title: 'Photonic Simulation Infrastructure for Research Teams',
    summary:
      'An engineering-focused walkthrough of simulation kernels, noise models, and compiler-level abstractions for photonic workflows.',
  },
  {
    title: 'Deterministic Scientific Software for Quantum Research',
    summary:
      'A software architecture discussion on reproducibility, diagnostics, and large-scale benchmarking reliability.',
  },
]

const blogTopics = [
  'Building robust replay streams for decoder evaluation.',
  'Design patterns for scientific software in Python, Rust, Julia, and Swift.',
  'Practical lessons from photonic simulator implementation.',
  'From numerical modeling to publishable reproducible artifacts.',
]

const linkedInEmbedUrl =
  'https://www.linkedin.com/embed/feed/update/urn:li:share:7452702797759901697?collapsed=1'
const linkedInFeedUrl = 'https://www.linkedin.com/feed/'
const googleScholarProfileUrl =
  'https://scholar.google.com/citations?hl=en&user=YCXIi1wAAAAJ&view_op=list_works&sortby=pubdate'
const mediumProfileUrl = 'https://medium.com/@iwayoden'
const mediumFeedApiUrl =
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40iwayoden'

const newsFeedPapers = [
  {
    title:
      'A Unified Hardware-to-Decoder Architecture for Hybrid Continuous-Variable and Discrete-Variable Quantum Error Correction in LiDMaS+',
    authors: 'DDK Wayo, C Onah, L Goliatt, S Groppe',
    source: 'arXiv preprint arXiv:2604.15389',
    year: '2026',
    scholarUrl:
      'https://scholar.google.com/scholar?q=A+Unified+Hardware-to-Decoder+Architecture+for+Hybrid+Continuous-Variable+and+Discrete-Variable+Quantum+Error+Correction+in+LiDMaS%2B',
  },
  {
    title:
      'RaCS: Near-Zero-Error Classical Data Encoding on Photonic Quantum Processors via Redundancy-Assisted Coherent-State Codes',
    authors: 'DDK Wayo, S Groppe',
    source: 'Fortschritte der Physik 74 (4), e70095',
    year: '2026',
    scholarUrl:
      'https://scholar.google.com/scholar?q=RaCS%3A+Near-Zero-Error+Classical+Data+Encoding+on+Photonic+Quantum+Processors+via+Redundancy-Assisted+Coherent-State+Codes',
  },
  {
    title:
      'Decoder Dependence in Surface-Code Threshold Estimation with Native Gottesman-Kitaev-Preskill Digitization and Parallelized Sampling',
    authors: 'DDK Wayo, C Onah, L Goliatt, S Groppe',
    source: 'arXiv preprint arXiv:2603.25757',
    year: '2026',
    scholarUrl:
      'https://scholar.google.com/scholar?q=Decoder+Dependence+in+Surface-Code+Threshold+Estimation+with+Native+Gottesman-Kitaev-Preskill+Digitization+and+Parallelized+Sampling',
  },
  {
    title:
      'Decoder Performance in Hybrid CV-Discrete Surface-Code Threshold Estimation Using LiDMaS+',
    authors: 'DDK Wayo, C Onah, L Goliatt, S Groppe',
    source: 'arXiv preprint arXiv:2603.06730',
    scholarUrl:
      'https://scholar.google.com/scholar?q=Decoder+Performance+in+Hybrid+CV-Discrete+Surface-Code+Threshold+Estimation+Using+LiDMaS%2B',
  },
]

const credlyBadgeIds = [
  'a79c80ab-b5e7-409d-b79a-5d32b5e908c1',
  '0178932e-0bcc-4309-90da-58d1c677a9bf',
  'a8a08345-f5f9-429d-9cc9-38c8aa835929',
  'af811789-c3be-4c06-a6b2-147d01d17897',
  '83a63d4e-af36-41e6-bfcf-afc945f465d4',
  'a1eea4ed-02db-4bad-be5d-32ba7fd26edf',
  '4038b42c-2a1a-412f-a787-8255ea28d3a7',
  'e5e3412d-f7b2-42cb-8a31-6cbf44dbc516',
  'e1fd3b4b-ba18-454d-88c9-5cc5435741ed',
  '45b79d81-26fc-4665-9262-5159b99bb241',
  '17f9188d-ddad-4191-a8ec-f77fce78a375',
  '4f994b1b-9cf3-4b85-a49a-b0d1f1dc10e4',
]

const colabStoryFrames = [
  {
    title: 'Photonic Quantum Chip',
    image: '/story-photonic-chip.jpg',
    alt: 'Photonic quantum chip with integrated optical pathways',
    summary:
      'Chip-scale photonic platforms where circuit design, optical control, and quantum behavior converge.',
  },
  {
    title: 'Quantum Error Correction',
    image: '/story-qec.jpg',
    alt: 'Quantum error correction concept with encoded qubits and correction pathways',
    summary:
      'Decoder benchmarking and threshold studies that convert fault-tolerance claims into measurable software evidence.',
  },
  {
    title: 'Photonic Material Modelling',
    image: '/story-photonic-material.jpg',
    alt: 'Photonic material structure used for computational optical modeling',
    summary:
      'Materials-level simulation for rare-earth and photonic systems, linking atomistic structure to device behavior.',
  },
  {
    title: 'Hydrogen',
    image: '/story-hydrogen.jpg',
    alt: 'Hydrogen molecule visualization representing energy and molecular modeling',
    summary:
      'Hydrogen-centric modeling that connects energy systems thinking with high-fidelity scientific computation.',
  },
  {
    title: 'Hydraulic Fracturing',
    image: '/story-hydraulic-fracturing.jpg',
    alt: 'Hydraulic fracturing operations equipment at a field site',
    summary:
      'Modeling fluid-rock interaction, fracture dynamics, and production behavior for unconventional reservoirs.',
  },
  {
    title: 'Remote Sensing',
    image: '/story-remote-sensing.jpg',
    alt: 'Remote sensing satellite view of Earth with cloud and surface patterns',
    summary:
      'Earth-observation analysis pipelines for geospatial insight, environmental monitoring, and data-driven decision support.',
  },
]

const wayoWorkflowSteps = [
  {
    code: 'develop_quantum_circuit()',
    detail: 'Design the quantum circuit and select the computational objective.',
  },
  {
    code: 'measure_noise()',
    detail: 'Characterize device-level noise and map dominant error channels.',
  },
  {
    code: 'encode_gkp_to_continuous_noise()',
    detail: 'Embed GKP structure into the continuous-noise model for resilience.',
  },
  {
    code: 'realize_physical_qubits()',
    detail: 'Instantiate physical qubits and hardware-relevant constraints.',
  },
  {
    code: 'encode_surface_code()',
    detail: 'Apply surface-code structure to organize fault-tolerant operations.',
  },
  {
    code: 'realize_error_syndromes()',
    detail: 'Extract and track syndrome signatures for correction logic.',
  },
  {
    code: 'evaluate_overheads()',
    detail: 'Compute overhead metrics and compare logical vs physical error behavior.',
  },
  {
    code: 'if (LER > PER) apply_decoding_policies()',
    detail: 'Trigger decoder-policy updates when logical errors exceed physical rates.',
    branch: true,
  },
  {
    code: 'check_stable_logical_qubit()',
    detail: 'Validate stability criteria for a usable logical qubit.',
  },
  {
    code: 'if (stable) build_logical_circuit()',
    detail: 'Construct the logical-level circuit only after stability is confirmed.',
    branch: true,
  },
  {
    code: 'solve_real_life_problems([hydrogen, hydraulic_fracturing, remote_sensing])',
    detail: 'Deploy validated logical workflows to scientific and engineering applications.',
  },
]

const software = [
  {
    key: 'Programming',
    tools: [
      {
        name: 'Python',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
      {
        name: 'C++',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      },
      {
        name: 'Rust',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
      },
      {
        name: 'CUDA',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nvidia/nvidia-original.svg',
      },
      {
        name: 'Bash',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
      },
      {
        name: 'Julia',
        logo: 'https://cdn.simpleicons.org/julia/9558B2',
      },
      {
        name: 'Swift',
        logo: 'https://cdn.simpleicons.org/swift/F05138',
      },
    ],
  },
  {
    key: 'Quantum Frameworks',
    tools: [
      { name: 'PennyLane' },
      { name: 'Qiskit', logo: 'https://cdn.simpleicons.org/qiskit/000000' },
      { name: 'Cirq' },
      { name: 'QuTiP' },
    ],
  },
  {
    key: 'Scientific Simulation',
    tools: [
      { name: 'GPAW (TDDFT)' },
      { name: 'MEEP (FDTD)' },
      { name: 'NLSE/SSFM' },
      { name: 'ASE' },
    ],
  },
  {
    key: 'Machine Learning',
    tools: [
      {
        name: 'PyTorch',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
      },
      {
        name: 'TensorFlow',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
      },
      { name: 'JAX' },
      { name: 'GNNs' },
      { name: 'PINNs' },
    ],
  },
  {
    key: 'Scientific Computing',
    tools: [
      { name: 'Numerical Linear Algebra' },
      { name: 'Automatic Differentiation' },
      { name: 'Parallel Workflows' },
      {
        name: 'Linux Environments',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      },
    ],
  },
]

function Layout({ children }) {
  return (
    <div className="page-grid">
      <div className="shell">
        <div className="site-gif-header" aria-label="Animated quantum header">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={headerMedia.poster}
            src={headerMedia.video}
          />
          <div className="site-gif-overlay" aria-hidden="true"></div>
          <header className="topbar">
            <nav className="tabs" aria-label="Primary">
              {tabs.map((tab) => (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  className={({ isActive }) => `tab ${isActive ? 'is-active' : ''}`}
                >
                  {tab.label}
                </NavLink>
              ))}
              <a className="tab utility" href="mailto:dwayo3@gatech.edu">
                contact
              </a>
            </nav>
          </header>
        </div>
        <main className="page-wrap">{children}</main>
        <footer className="footer">
          <div className="footer-icons">
            {footerContacts.map((item) => (
              <a
                key={item.label}
                className={`footer-icon ${item.square ? 'square' : ''}`}
                href={item.href}
                aria-label={item.label}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
              >
                <img src={item.icon} alt="" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="footer-lead">
            You can get in touch with me easily by calling or sending an email.
          </p>
          <div className="footer-bar">
            <p>
              (c) Copyright 2026 Dennis Wayo. Hosted by GitHub Pages. Last updated:
              April 26, 2026.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

function AboutPage() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = 'https://cdn.credly.com/assets/utilities/embed.js'
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <Layout>
      <section className="page about-page">
        <div className="hero-grid">
          <article>
            <p className="eyebrow">Quantum Architect</p>
            <h1>Dennis Wayo</h1>
            <p className="lead">
              I build scientific software where quantum theory, numerical modeling, and
              systems engineering meet. My work centers on creating simulation and
              benchmarking infrastructure that is rigorous enough for publication and stable
              enough for repeatable experimentation.
            </p>
            <p>
              My technical trajectory runs from mechanical engineering to petroleum
              engineering and now into advanced computer science and quantum simulation.
              That path shaped my engineering style: start from physical constraints, design
              the software architecture around reproducibility, and then optimize for scale.
            </p>
            <p>
              I hold a PhD in Chemical Engineering from UMPSA and I am currently pursuing
              the Master of Science in Computer Science (OMSCS) at the Georgia Institute of
              Technology.
            </p>
            <p>
              I am the creator of <strong>LiDMaS+</strong> and <strong>SchroSIM</strong>,
              and I build both systems as production-grade research software, not just demo
              prototypes.
            </p>
            <p>
              At the center of my current work is <strong>LiDMaS+</strong>, a logical
              decoder benchmarking engine built for replay-driven evaluation under unified
              decoder I/O contracts. LiDMaS+ was designed so decoder comparisons stop being
              ad-hoc and become deterministic, inspectable, and portable across workflows.
              The platform tracks syndrome satisfaction, residual nonzero rate, average flip
              count, and consistency diagnostics so claims can be validated instead of
              guessed.
            </p>
            <p>
              In parallel, I am developing <strong>SchroSIM</strong>, a scalable
              hardware-agnostic quantum photonic simulator. SchroSIM integrates nonlinear
              propagation, Gaussian and non-Gaussian operations, and detector-level behavior
              while staying modular enough for hybrid classical-quantum execution paths.
              It is structured to support both fast exploratory modeling and deeper
              compiler-level reasoning about continuous-variable circuits and noise channels.
            </p>
            <p>
              My longer-term objective is to establish a reliable software layer for
              hardware-aware quantum evaluation, where theoretical work can move quickly
              into tested computational pipelines and then into reproducible scientific
              outputs.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="/MyCV.pdf" download>
                Download CV
              </a>
              <NavLink className="btn btn-secondary" to="/projects">
                Explore Projects
              </NavLink>
            </div>
          </article>
          <div className="about-rail">
            <figure className="portrait-card">
              <img src="/dennis_image.jpeg" alt="Dennis Wayo" />
              <figcaption className="portrait-meta">
                <p className="portrait-title">Quantum Architecture</p>
                <p>53 Kabanbay Batyr Ave Astana, Kazakhstan, 010000</p>
              </figcaption>
            </figure>
            <article className="panel news-feed-panel">
              <h2>News Feed</h2>
              <div className="linkedin-feed">
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:share:7452702797759901697?collapsed=1"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  allowFullScreen
                  title="Embedded LinkedIn post"
                ></iframe>
              </div>
              <div className="news-publications">
                <h3>Recent Publications</h3>
                <div className="news-paper-marquee" aria-label="Continuous publication feed">
                  <div className="news-paper-track">
                    <ul className="news-paper-list">
                      {newsFeedPapers.map((item) => (
                        <li className="news-paper-item" key={item.title}>
                          <a href={item.scholarUrl} target="_blank" rel="noreferrer">
                            {item.title}
                          </a>
                          <p>{item.authors}</p>
                          <p>
                            {item.source}
                            {item.year ? <span>{` | ${item.year}`}</span> : null}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <ul className="news-paper-list" aria-hidden="true">
                      {newsFeedPapers.map((item) => (
                        <li className="news-paper-item" key={`${item.title}-dup`}>
                          <a href={item.scholarUrl} target="_blank" rel="noreferrer" tabIndex={-1}>
                            {item.title}
                          </a>
                          <p>{item.authors}</p>
                          <p>
                            {item.source}
                            {item.year ? <span>{` | ${item.year}`}</span> : null}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="feature-grid">
          <article className="feature">
            <p className="feature-tag">Core System</p>
            <h2>LiDMaS+</h2>
            <p>
              Replay-first decoder benchmarking with deterministic regeneration checks,
              unified request contracts, and decoder-swap architecture.
            </p>
          </article>
          <article className="feature">
            <p className="feature-tag">Core System</p>
            <h2>SchroSIM</h2>
            <p>
              Layered photonic-circuit simulation platform that separates circuit authoring,
              compilation, numerical execution, and hardware mapping for modular and
              scalable workflows.
            </p>
          </article>
        </div>

        <section className="focus-zone">
          <h2>Laser Focus</h2>
          <div className="grid two about-focus-grid">
            <article className="panel">
              <h3>Quantum Software and Compilation</h3>
              <ul className="focus-list">
                <li>Photonic circuit simulation (Gaussian + non-Gaussian)</li>
                <li>Differentiable programming and variational algorithms</li>
                <li>Resource estimation and gate-depth prediction</li>
                <li>Algorithm decomposition and hardware mapping</li>
              </ul>
            </article>
            <article className="panel">
              <h3>Quantum Architectures and Fault Tolerance</h3>
              <ul className="focus-list">
                <li>Cluster-state photonic computation (MBQC intuition)</li>
                <li>Bosonic codes and coherent-state redundancy schemes</li>
                <li>Error propagation modeling and QEC-inspired encodings</li>
              </ul>
            </article>
            <article className="panel">
              <h3>Computational Photonics and Materials Modeling</h3>
              <ul className="focus-list">
                <li>TDDFT/LR-TDDFT for quantum emitters and rare-earth ions</li>
                <li>NLSE propagation, soliton/dispersion modeling, detector physics</li>
                <li>MEEP-FDTD validation of chip-scale photonic components</li>
              </ul>
            </article>
          </div>
        </section>
        <section className="credly-strip" aria-label="Credly badge highlights">
          <h2>Badges</h2>
          <div className="credly-marquee">
            <div className="credly-track">
              {[0, 1].map((duplicateIndex) => (
                <div className="credly-badge-row" key={`credly-row-${duplicateIndex}`}>
                  {credlyBadgeIds.map((badgeId) => (
                    <div
                      key={`${badgeId}-${duplicateIndex}`}
                      className="credly-badge-embed"
                      data-iframe-width="150"
                      data-iframe-height="270"
                      data-share-badge-id={badgeId}
                      data-share-badge-host="https://www.credly.com"
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </Layout>
  )
}

function BlogPage() {
  const [mediumPosts, setMediumPosts] = useState([])
  const [mediumStatus, setMediumStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false

    async function loadMediumFeed() {
      setMediumStatus('loading')

      try {
        const response = await fetch(mediumFeedApiUrl)

        if (!response.ok) {
          throw new Error(`Medium feed request failed: ${response.status}`)
        }

        const payload = await response.json()
        const items = Array.isArray(payload.items) ? payload.items : []
        const normalizedItems = items.slice(0, 6).map((item) => ({
          title: item.title || 'Untitled Post',
          link: item.link || mediumProfileUrl,
          pubDate: item.pubDate || '',
        }))

        if (cancelled) {
          return
        }

        setMediumPosts(normalizedItems)
        setMediumStatus('ready')
      } catch {
        if (cancelled) {
          return
        }

        setMediumPosts([])
        setMediumStatus('error')
      }
    }

    loadMediumFeed()

    return () => {
      cancelled = true
    }
  }, [])

  const formatMediumDate = (value) => {
    const parsed = value ? new Date(value) : null

    if (!parsed || Number.isNaN(parsed.getTime())) {
      return 'Recent'
    }

    return parsed.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Layout>
      <section className="page blog-page">
        <h1>Blog</h1>
        <p className="lead">
          Live feed from LinkedIn and Medium, plus technical writing tracks that document
          simulation systems, benchmarking methodology, and reproducibility practices.
        </p>
        <div className="grid two blog-live-grid">
          <article className="panel blog-feed-panel">
            <h2>LinkedIn Live Feed</h2>
            <div className="blog-linkedin-frame">
              <iframe
                src={linkedInEmbedUrl}
                width="100%"
                height="430"
                frameBorder="0"
                allowFullScreen
                title="LinkedIn live feed"
              ></iframe>
            </div>
            <div className="blog-feed-actions">
              <a
                className="btn btn-secondary"
                href={linkedInFeedUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open LinkedIn Feed
              </a>
            </div>
          </article>
          <article className="panel blog-feed-panel">
            <h2>Medium Live Feed</h2>
            {mediumStatus === 'loading' ? (
              <p>Loading latest Medium posts...</p>
            ) : mediumStatus === 'error' ? (
              <p>
                Unable to load Medium feed right now. Please use the button below to open
                the profile directly.
              </p>
            ) : mediumPosts.length === 0 ? (
              <p>No published Medium posts are currently available in the feed.</p>
            ) : (
              <ul className="blog-medium-list">
                {mediumPosts.map((post) => (
                  <li key={`${post.link}-${post.title}`}>
                    <a href={post.link} target="_blank" rel="noreferrer">
                      {post.title}
                    </a>
                    <p>{formatMediumDate(post.pubDate)}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="blog-feed-actions">
              <a
                className="btn btn-secondary"
                href={mediumProfileUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open Medium
              </a>
            </div>
          </article>
        </div>
        <div className="grid two blog-topic-grid">
          {blogTopics.map((topic) => (
            <article className="panel" key={topic}>
              <h2>{topic}</h2>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function PublicationsPage() {
  const publicationsByYear = publications.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = []
    }

    acc[item.year].push(item)
    return acc
  }, {})

  const publicationYears = Object.keys(publicationsByYear)
    .map((year) => Number(year))
    .sort((a, b) => b - a)

  return (
    <Layout>
      <section className="page">
        <h1>Publications</h1>
        <p className="lead">
          Papers grouped by publication year, with direct journal or preprint links on
          each entry.
        </p>
        <div className="publication-toolbar">
          <a
            className="scholar-profile-link"
            href={googleScholarProfileUrl}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://cdn.simpleicons.org/googlescholar/111111"
              alt=""
              aria-hidden="true"
            />
            <span>Google Scholar</span>
          </a>
        </div>
        {publicationYears.map((year) => (
          <section className="publication-year-group" key={year}>
            <h2 className="publication-year-title">{year}</h2>
            <ul className="publication-list">
              {publicationsByYear[year].map((item) => (
                <li className="publication-item" key={item.key}>
                  <div className="publication-copy">
                    <h3>{item.title}</h3>
                    <p className="publication-citation">{item.citation}</p>
                    <p className="publication-abstract">{item.abstract}</p>
                    <a
                      className="publication-link"
                      href={item.paperUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.paperLabel}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>
    </Layout>
  )
}

function ProjectsPage() {
  return (
    <Layout>
      <section className="page projects-page">
        <h1>Projects</h1>
        <p className="lead">
          Featured software systems below include architecture-level context and
          implementation-level execution flow.
        </p>
        <section className="software-showcase" aria-label="Featured software">
          <div className="software-cards">
            {softwareShowcase.map((item) => (
              <article className="software-card" key={item.name}>
                <figure className="software-media">
                  <img src={item.image} alt={item.imageAlt} />
                </figure>
                <div className="software-copy">
                  <p className="meta">{item.timeline}</p>
                  <h2>{item.name}</h2>
                  {item.creator ? <p className="creator-flex">{item.creator}</p> : null}
                  <p>{item.introduction}</p>
                  <p>{item.mechanism}</p>
                  <div className="software-detail-grid">
                    <details className="software-accordion">
                      <summary>How It Works</summary>
                      <ol className="flow-list">
                        {item.workflow.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </details>
                    <details className="software-accordion">
                      <summary>What It Produces</summary>
                      <ul className="detail-list">
                        {item.outputs.map((output) => (
                          <li key={output}>{output}</li>
                        ))}
                      </ul>
                    </details>
                  </div>
                  <div className="software-links">
                    <a
                      className="btn btn-secondary"
                      href={item.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open Repository
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="metrics-section" aria-label="GitHub metrics">
          <h2 className="projects-subtitle">GitHub Metrics</h2>
          <div className="metrics-grid">
            {githubMetrics.map((item) => (
              <article
                className={`metric-card ${item.featured ? 'is-featured' : ''}`}
                key={item.title}
              >
                {item.type === 'core-languages' ? (
                  <div className="metric-core">
                    <h3>{item.title}</h3>
                    <ul className="metric-language-list">
                      {item.languages.map((language) => (
                        <li key={language.name}>
                          <img src={language.logo} alt={`${language.name} logo`} title={language.name} />
                          <span className="metric-language-name">{language.name}</span>
                        </li>
                      ))}
                    </ul>
                    <p>{item.note}</p>
                  </div>
                ) : item.href ? (
                  <a
                    className="metric-link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.title}
                  >
                    <figure className="metric-media">
                      <img
                        className={`metric-image ${item.fit === 'contain' ? 'is-contain' : ''}`}
                        src={item.image}
                        alt={item.alt}
                      />
                    </figure>
                  </a>
                ) : (
                  <figure className="metric-media">
                    <img
                      className={`metric-image ${item.fit === 'contain' ? 'is-contain' : ''}`}
                      src={item.image}
                      alt={item.alt}
                    />
                  </figure>
                )}
              </article>
            ))}
          </div>
        </section>
      </section>
    </Layout>
  )
}

function MentoringPage() {
  return (
    <Layout>
      <section className="page mentoring-page">
        <h1>Mentoring</h1>
        <p className="lead">
          I mentored in the IBM Quantum Qiskit Advocate Mentorship Programme during
          2025/2026. The mentorship focused on hands-on quantum engineering where
          participants connected theory, reproducible code, and publication-ready results.
        </p>
        <div className="grid two mentoring-grid">
          <article className="panel">
            <h2>What I Mentored</h2>
            <ul className="clean-list">
              <li>I mentored researchers and students through practical quantum workflows.</li>
              <li>I translated research ideas into reproducible simulation and benchmarking code.</li>
              <li>I supported model design, experiment setup, and result interpretation.</li>
              <li>I guided publication-focused engineering quality for scientific software.</li>
            </ul>
          </article>
          <article className="panel">
            <h2>IBM Qiskit Advocate Mentorship (2025/2026)</h2>
            <p>
              The Q-UCSpec workstream was part of this mentorship cycle and supported
              practical learning on quantum-classical problem formulation and reproducible
              implementation.
            </p>
            <a
              className="btn btn-secondary"
              href="https://github.com/DennisWayo/Q-UCSpec"
              target="_blank"
              rel="noreferrer"
            >
              Open Q-UCSpec Repository
            </a>
          </article>
        </div>
        <section className="panel mentoring-paper">
          <h2>Featured arXiv Paper</h2>
          <p>
            Featured paper from the 2025/2026 mentorship cycle: arXiv:2602.00525.
          </p>
          <div className="mentoring-links">
            <a
              className="btn btn-secondary"
              href="https://arxiv.org/abs/2602.00525"
              target="_blank"
              rel="noreferrer"
            >
              View on arXiv
            </a>
          </div>
          <figure className="mentoring-paper-media">
            <img
              src="/arxiv-2602-00525.png"
              alt="arXiv page screenshot for paper 2602.00525"
              loading="lazy"
            />
          </figure>
        </section>
        <div className="grid two mentoring-grid">
          <article className="panel">
            <h2>Mentorship Outcomes</h2>
            <p>
              Participants gain practical exposure to quantum tooling, hybrid modeling
              approaches, and scientific software standards that support reproducible
              research outputs.
            </p>
          </article>
        </div>
      </section>
    </Layout>
  )
}

function ColabXPage() {
  return (
    <Layout>
      <section className="page">
        <h1>colabX</h1>
        <p className="lead">
          Collaboration is welcome where scientific rigor and software reliability are
          equally important.
        </p>
        <section className="colab-story" aria-label="Research story highlights">
          <h2>Story Highlights</h2>
          <p>
            Four domains that define how I connect scientific theory, software engineering,
            and reproducible computational practice.
          </p>
          <div className="story-grid">
            {colabStoryFrames.map((item) => (
              <article className="story-card" key={item.title}>
                <figure className="story-media">
                  <img src={item.image} alt={item.alt} loading="lazy" />
                </figure>
                <div className="story-copy">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="grid two">
          <article className="panel">
            <h2>Collaboration Areas</h2>
            <ul className="clean-list">
              <li>Photonic quantum simulation and hybrid CV-discrete workflows.</li>
              <li>Hardware-aware decoder benchmarking and replay-driven validation.</li>
              <li>
                Scientific software architecture in Python, Rust, C++, Julia, and Swift.
              </li>
              <li>Large-scale reproducible HPC research pipelines.</li>
            </ul>
          </article>
          <article className="panel">
            <h2>Contact</h2>
            <p>
              Email: <a href="mailto:dwayo3@gatech.edu">dwayo3@gatech.edu</a>
            </p>
            <p>Location: Astana, Kazakhstan</p>
          </article>
        </div>
      </section>
    </Layout>
  )
}

function SoftwarePage() {
  return (
    <Layout>
      <section className="page">
        <h1>Software</h1>
        <div className="grid two">
          {software.map((item) => (
            <article className="panel" key={item.key}>
              <h2>{item.key}</h2>
              <div className="tool-grid">
                {item.tools.map((tool) => (
                  <div className="tool-chip" key={tool.name}>
                    {tool.logo ? (
                      <img src={tool.logo} alt={`${tool.name} logo`} />
                    ) : (
                      <span className="tool-fallback" aria-hidden="true">
                        {tool.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    <span>{tool.name}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function WayoAiPage() {
  return (
    <Layout>
      <section className="page wayo-page">
        <h1>wayo.ai</h1>
        <p className="lead">
          wayo.ai is the execution layer where quantum modeling, error-correction logic,
          and application-facing computation are converted into one deterministic workflow.
        </p>
        <section className="panel wayo-flow" aria-label="Vertical workflow steps">
          <h2>Workflow Steps</h2>
          <ol className="wayo-code-stream">
            {wayoWorkflowSteps.map((step) => (
              <li
                className={`wayo-code-step ${step.branch ? 'is-branch' : ''}`}
                key={step.code}
              >
                <code>{step.code}</code>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>
        <div className="grid two wayo-support-grid">
          <article className="panel">
            <h2>Pipeline Intent</h2>
            <p>
              The flow is engineered as a strict progression from circuit design to
              logical-qubit stability so each transition is testable, measurable, and
              reproducible under the same policy constraints.
            </p>
          </article>
          <article className="panel">
            <h2>Application Targets</h2>
            <ul className="clean-list">
              <li>Hydrogen modeling and quantum-assisted chemistry workflows.</li>
              <li>Hydraulic fracturing simulation and decision-support modeling.</li>
              <li>Remote sensing interpretation pipelines for geospatial analytics.</li>
            </ul>
          </article>
        </div>
      </section>
    </Layout>
  )
}

function TalksPage() {
  return (
    <Layout>
      <section className="page">
        <h1>talKs</h1>
        <div className="grid three">
          {talks.map((talk) => (
            <article className="panel" key={talk.title}>
              <h2>{talk.title}</h2>
              <p>{talk.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/about" />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/publications" element={<PublicationsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/mentoring" element={<MentoringPage />} />
      <Route path="/teaching" element={<Navigate replace to="/mentoring" />} />
      <Route path="/colabx" element={<ColabXPage />} />
      <Route path="/software" element={<SoftwarePage />} />
      <Route path="/wayo-ai" element={<WayoAiPage />} />
      <Route path="/talks" element={<TalksPage />} />
      <Route path="*" element={<Navigate replace to="/about" />} />
    </Routes>
  )
}

export default App
