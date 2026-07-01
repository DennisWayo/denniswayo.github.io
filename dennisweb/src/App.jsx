import { useEffect, useRef, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

const githubUsername = 'DennisWayo'
const githubProfileUrl = `https://github.com/${githubUsername}`
const githubContributionChartUrl = `https://ghchart.rshah.org/${githubUsername}`
const visitCounterApiBaseUrl = 'https://countapi.mileshilliard.com/api/v1'
const visitCounterKey = 'denniswayo_github_io_visits'
const visitCounterSessionKey = 'denniswayo_github_io_visit_counted_v1'
let visitCountedInMemory = false
const parsedBuildDate = new Date(import.meta.env.VITE_BUILD_DATE || '')
const resolvedBuildDate = Number.isNaN(parsedBuildDate.getTime()) ? new Date() : parsedBuildDate
const lastUpdatedDateLabel = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
}).format(resolvedBuildDate)

function getMaxScrollY() {
  const documentElement = document.documentElement
  return Math.max(0, documentElement.scrollHeight - window.innerHeight)
}

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  try {
    const savedTheme = window.localStorage.getItem('site-theme')

    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme
    }
  } catch {
    // Fall back to the browser preference when localStorage is unavailable.
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light'
}

const tabs = [
  { label: 'about', path: '/about' },
  { label: 'projects', path: '/projects' },
  { label: 'blog', path: '/blog' },
  { label: 'publications', path: '/publications' },
  { label: 'mentoring', path: '/mentoring' },
  { label: 'colabX', path: '/colabx' },
  { label: 'software', path: '/software' },
  { label: 'wayo.ai', path: '/wayo-ai' },
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
    href: githubProfileUrl,
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

const publications = [
  {
    key: 'optical-descriptors-2026',
    year: 2026,
    title:
      'First-Principles Optical Descriptors and Hybrid Classical-Quantum Classification of Er-Doped CaF2',
    citation:
      'Alba Bonilla, D. A., Yurtseven, K., Sharma, K., Chandrasekharan, R., Khizar, M., Alipour, A., & Wayo, D. D. K. (2026). Advanced Theory and Simulations. Accepted 15 May 2026.',
    paperUrl: 'https://www.advtheorysimul.com',
    paperLabel: 'Open Journal',
    abstract:
      'Presents a first-principles optical-descriptor workflow for classifying pristine and Er-doped CaF2, combining DFT/LR-TDDFT features with classical, quantum, and hybrid learning models.',
  },
  {
    key: 'unified-hardware-decoder-2026',
    year: 2026,
    title:
      'A Unified Hardware-to-Decoder Architecture for Hybrid Continuous-Variable and Discrete-Variable Quantum Error Correction in LiDMaS+',
    citation: 'Wayo, D.D.K., Onah, C., Goliatt, L., & Groppe, S. (2026). arXiv:2604.15389.',
    paperUrl: 'https://arxiv.org/abs/2604.15389',
    paperLabel: 'Open arXiv',
    abstract:
      'Introduces a unified hardware-to-decoder workflow for hybrid continuous-variable and discrete-variable quantum error correction in LiDMaS+, enabling reproducible cross-decoder evaluation from syndrome generation through logical-error analysis.',
  },
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
      'Decoder Dependence in Surface-Code Threshold Estimation Under Digitized Hybrid Continuous-Variable and Discrete Noise',
    citation:
      'Wayo, D.D.K., Onah, C., Goliatt, L., & Groppe, S. (2026). Fortschritte der Physik. Accepted 4 June 2026.',
    paperUrl: 'https://onlinelibrary.wiley.com/doi/10.1002/prop.70124',
    paperLabel: 'Open Journal',
    abstract:
      'Shows how decoder and estimator choices shift surface-code threshold conclusions under digitized hybrid continuous-variable and discrete noise, using LiDMaS+ workflows with crossing diagnostics and runtime-fidelity checks.',
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

const publicationSpotlight = {
  key: 'decoder-dependence-2026',
  label: 'Publication Spotlight',
  image: '/publication-spotlight-decoder-dependence.png',
  imageAlt:
    'First page preview of the Fortschritte der Physik paper on decoder dependence in surface-code threshold estimation.',
}

const openSourceContributions = [
  {
    project: 'Qibolab',
    icon: 'https://github.com/qiboteam.png?size=96',
    iconText: 'Qi',
    iconTone: 'qibo',
    scope: 'Dynamiqs simulation engine',
    summary:
      'Added a Dynamiqs simulation engine for emulator and hardware-control development workflows, including dependency integration and focused emulator tests. Completed as a UnitaryHack 2026 Qibo/Qibolab bounty.',
    status: 'Merged / Bounty completed',
    links: [
      { label: 'Issue #1411', href: 'https://github.com/qiboteam/qibolab/issues/1411' },
      { label: 'PR #1479', href: 'https://github.com/qiboteam/qibolab/pull/1479' },
    ],
  },
  {
    project: 'Qibolab',
    icon: 'https://github.com/qiboteam.png?size=96',
    iconText: 'Qi',
    iconTone: 'qibo',
    scope: 'Emulator evolution and result handling',
    summary:
      'Fixed emulator evolution and result-handling paths after storage/GPU changes, including QuTiP/Dynamiqs compatibility and cyclic probability marginalization validated with Qibocal Rabi smoke runs.',
    status: 'Merged',
    links: [
      { label: 'PR #1497', href: 'https://github.com/qiboteam/qibolab/pull/1497' },
      { label: 'PR #1505', href: 'https://github.com/qiboteam/qibolab/pull/1505' },
    ],
  },
  {
    project: 'Qibocal',
    icon: 'https://github.com/qiboteam.png?size=96',
    iconText: 'Qc',
    iconTone: 'qibo',
    scope: 'Example-platform drive configuration',
    summary:
      'Updated emulator example-platform drive configuration for current Qibolab schemas and validated Qibocal Rabi smoke runs on qubit and qutrit platforms.',
    status: 'Merged',
    links: [{ label: 'PR #1551', href: 'https://github.com/qiboteam/qibocal/pull/1551' }],
  },
  {
    project: 'Mitiq/Qibo',
    icon: 'https://github.com/unitaryfoundation.png?size=96',
    iconText: 'MQ',
    iconTone: 'mitiq',
    scope: 'Error-mitigation tutorial',
    summary:
      'Developed a Qibo tutorial combining repetition-code syndrome checks, post-selection/correction, noise sweeps, and zero-noise extrapolation for reproducible benchmarking workflows.',
    status: 'Open',
    links: [{ label: 'PR #3023', href: 'https://github.com/unitaryfoundation/mitiq/pull/3023' }],
  },
  {
    project: 'Qiskit',
    icon: 'https://cdn.simpleicons.org/qiskit/6929C4',
    iconText: 'Qk',
    scope: 'Circuit labels and QPY test structure',
    summary:
      'Extended QuantumCircuit standard and controlled-gate helpers to propagate gate labels, added regression tests, and refactored QPY roundtrip load-test setup.',
    status: 'Submitted',
    links: [
      { label: 'PR #16373', href: 'https://github.com/Qiskit/qiskit/pull/16373' },
      { label: 'PR #16372', href: 'https://github.com/Qiskit/qiskit/pull/16372' },
    ],
  },
  {
    project: 'PennyLane',
    icon: '/pennylane-logo.png',
    iconText: 'PennyLane',
    iconTone: 'pennylane-logo',
    hideProjectLabel: true,
    scope: 'Documentation testing and diagnostics',
    summary:
      'Enabled documentation testing for pennylane.shadows, corrected executable classical-shadow examples, and improved qml.assert_equal diagnostics for measurement-process mismatches.',
    status: 'Merged / Open',
    links: [
      { label: 'PR #9566', href: 'https://github.com/PennyLaneAI/pennylane/pull/9566' },
      { label: 'PR #9605', href: 'https://github.com/PennyLaneAI/pennylane/pull/9605' },
    ],
  },
  {
    project: 'PennyLane',
    icon: '/pennylane-logo.png',
    iconText: 'PennyLane',
    iconTone: 'pennylane-logo',
    hideProjectLabel: true,
    scope: 'Developer ergonomics',
    summary:
      'Added text-drawer multiplexer rendering for SelectPauliRot and improved ExecutionConfig print readability for clearer debugging output.',
    status: 'Submitted',
    links: [
      { label: 'PR #9604', href: 'https://github.com/PennyLaneAI/pennylane/pull/9604' },
      { label: 'PR #9603', href: 'https://github.com/PennyLaneAI/pennylane/pull/9603' },
    ],
  },
]

const githubMetrics = [
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
        logo: 'https://cdn.simpleicons.org/nvidia/76B900',
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
    title: 'Unified Hardware-to-Decoder Pipelines for QEC Evaluation',
    summary:
      'How hardware syndrome streams are normalized and replayed across decoder backends to produce auditable, cross-platform threshold comparisons.',
  },
  {
    title: 'Hybrid CV-Discrete Threshold Studies with LiDMaS+',
    summary:
      'Design and interpretation of hybrid continuous-variable and discrete surface-code experiments, with focus on decoder sensitivity under realistic noise.',
  },
  {
    title: 'Native GKP Digitization and Decoder Performance Tradeoffs',
    summary:
      'An analysis of how digitization strategy and decoder pairing shift logical-error behavior, crossing points, and practical fault-tolerance conclusions.',
  },
  {
    title: 'Decoder Reliability Metrics Beyond Logical Error Rate',
    summary:
      'A practical framework for syndrome satisfaction, residual-nonzero diagnostics, and replay consistency as complementary QEC decoder quality indicators.',
  },
  {
    title: 'Rare-Earth Photonic Materials from DFT to Optical Signatures',
    summary:
      'From atomistic modeling to excited-state descriptors: how DFT and LR-TDDFT workflows expose material-level optical fingerprints for photonic design.',
  },
  {
    title: 'Physics-Informed Quantum ML for Photonic Material Classification',
    summary:
      'Using first-principles optical descriptors with hybrid classical-quantum models to classify Er-doped photonic systems under NISQ-era constraints.',
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

const linkedInEmbedUrl =
  'https://www.linkedin.com/embed/feed/update/urn:li:share:7452702797759901697?collapsed=1'
const linkedInPostUrl = 'https://www.linkedin.com/feed/update/urn:li:share:7452702797759901697/'
const linkedInFeedUrl = 'https://www.linkedin.com/feed/'
const googleScholarProfileUrl =
  'https://scholar.google.com/citations?hl=en&user=YCXIi1wAAAAJ&view_op=list_works&sortby=pubdate'
const mediumProfileUrl = 'https://medium.com/@iwayoden'
const mediumFeedApiUrl =
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40iwayoden'
const unitaryHackProfileUrl = 'https://unitaryhack.dev/hackers/denniswayo/'

const newsFeedPapers = [
  {
    title: 'Dennis Wayo UnitaryHack 2026 Hacker Profile: 3 Bounties Completed',
    authors: 'Unitary Foundation',
    source: '$175 claimed across PennyLane, Qibo, and Qiskit',
    year: '2026',
    href: unitaryHackProfileUrl,
  },
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
      'Decoder Dependence in Surface-Code Threshold Estimation Under Digitized Hybrid Continuous-Variable and Discrete Noise',
    authors: 'DDK Wayo, C Onah, L Goliatt, S Groppe',
    source: 'Fortschritte der Physik, accepted 4 June 2026',
    year: '2026',
    href: 'https://onlinelibrary.wiley.com/doi/10.1002/prop.70124',
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

const badgeGroups = [
  {
    key: 'pennylane-wiser',
    label: 'PennyLane & WISER',
    type: 'links',
    items: [
      {
        title: 'WISER/Womanium 2025 Certificate',
        subtitle: 'Module 2: Quantum Algorithms (Trotterization)',
        href: 'https://pennylane.ai/profile/Dela/certificate/pennylane-certificate-womanium-wiser-trotterization-2025',
        image: '/badges/wiser-module-2-certificate.png',
        imageAlt: 'WISER and Womanium 2025 Module 2 certificate',
      },
      {
        title: 'WISER/Womanium 2025 Certificate',
        subtitle: 'Module 5: Quantum Algorithms for Nonlinear Differential Equations',
        href: 'https://pennylane.ai/profile/Dela/certificate/pennylane-certificate-womanium-wiser-trotterization-2025',
        image: '/badges/wiser-module-5-certificate.png',
        imageAlt: 'WISER and Womanium 2025 Module 5 certificate',
      },
      {
        title: 'PennyLane Certificate',
        subtitle: 'PennyLane Profile',
        href: 'https://pennylane.ai/profile/Dela/certificate/pennylane-certificate-womanium-wiser-trotterization-2025',
        image: '/badges/pennylane-certificate.svg',
        imageAlt: 'PennyLane certificate artwork',
      },
      {
        title: 'PennyLane Badge: A Beginning',
        subtitle: 'PennyLane Profile',
        href: 'https://pennylane.ai/profile/Dela/badge/a-beginning',
        image: '/badges/pennylane-a-beginning.png',
        imageAlt: 'PennyLane A Beginning badge',
      },
      {
        title: 'PennyLane Badge: Long Winding',
        subtitle: 'PennyLane Profile',
        href: 'https://pennylane.ai/profile/Dela/badge/long-winding',
        image: '/badges/pennylane-long-winding.png',
        imageAlt: 'PennyLane Long Winding badge',
      },
      {
        title: 'PennyLane Badge: Getting Better',
        subtitle: 'PennyLane Profile',
        href: 'https://pennylane.ai/profile/Dela/badge/getting-better',
        image: '/badges/pennylane-getting-better.png',
        imageAlt: 'PennyLane Getting Better badge',
      },
      {
        title: 'PennyLane Badge: Intro to Resource Estimation',
        subtitle: 'PennyLane Profile',
        href: 'https://pennylane.ai/profile/Dela/badge/intro-to-resource-estimation',
        image: '/badges/pennylane-intro-resource-estimation.png',
        imageAlt: 'PennyLane Intro to Resource Estimation badge',
      },
      {
        title: 'PennyLane Badge: Seen a Phase',
        subtitle: 'PennyLane Profile',
        href: 'https://pennylane.ai/profile/Dela/badge/seen-a-phase',
        image: '/badges/pennylane-seen-a-phase.png',
        imageAlt: 'PennyLane Seen a Phase badge',
      },
      {
        title: 'PennyLane Badge: In My Eyes',
        subtitle: 'PennyLane Profile',
        href: 'https://pennylane.ai/profile/Dela/badge/in-my-eyes',
        image: '/badges/pennylane-in-my-eyes.png',
        imageAlt: 'PennyLane In My Eyes badge',
      },
      {
        title: 'PennyLane Badge: UnitaryHack 2026',
        subtitle: 'PennyLane Profile',
        href: 'https://pennylane.ai/profile/Dela/badge/unitaryhack-2026',
        image: '/badges/pennylane-unitaryhack-2026.png',
        imageAlt: 'PennyLane UnitaryHack 2026 badge',
      },
    ],
  },
  {
    key: 'ibm',
    label: 'IBM Quantum',
    type: 'credly',
    items: [
      'a79c80ab-b5e7-409d-b79a-5d32b5e908c1',
      '0178932e-0bcc-4309-90da-58d1c677a9bf',
      'a8a08345-f5f9-429d-9cc9-38c8aa835929',
      'af811789-c3be-4c06-a6b2-147d01d17897',
      '83a63d4e-af36-41e6-bfcf-afc945f465d4',
      'a1eea4ed-02db-4bad-be5d-32ba7fd26edf',
      '4038b42c-2a1a-412f-a787-8255ea28d3a7',
      'e5e3412d-f7b2-42cb-8a31-6cbf44dbc516',
      'e1fd3b4b-ba18-454d-88c9-5cc5435741ed',
    ],
  },
  {
    key: 'google',
    label: 'Google',
    type: 'credly',
    items: [
      '45b79d81-26fc-4665-9262-5159b99bb241',
      '17f9188d-ddad-4191-a8ec-f77fce78a375',
      '4f994b1b-9cf3-4b85-a49a-b0d1f1dc10e4',
    ],
  },
]

function buildTickerItems(items, minItems) {
  if (!Array.isArray(items) || items.length === 0) {
    return []
  }

  const expanded = [...items]
  let cursor = 0

  while (expanded.length < minItems) {
    expanded.push(items[cursor % items.length])
    cursor += 1
  }

  return expanded
}

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

const collaborators = [
  {
    name: 'Sven Groppe',
    initials: 'SG',
    role: 'Professor of Artificial Intelligence',
    institution: 'TU Bergakademie Freiberg',
    summary:
      'Collaborator on quantum data systems, decoder workflows, AI, knowledge graphs, data management, and reproducible research software.',
    tags: ['Artificial Intelligence', 'Quantum Computing', 'Data Science'],
    links: [{ label: 'Profile', href: 'https://svengroppe.github.io/' }],
  },
  {
    name: 'Leonardo Goliatt',
    initials: 'LG',
    role: 'Professor, PhD in Computational Modeling',
    institution: 'Universidade Federal de Juiz de Fora',
    summary:
      'Collaborator across computational modeling, quantum photonic simulation, QEC benchmarking, AI, machine learning, and scientific computing workflows.',
    tags: ['Computational Modeling', 'AI/ML', 'Quantum Photonics'],
    links: [
      {
        label: 'Lattes',
        href: 'https://buscatextual.cnpq.br/buscatextual/visualizacv.do;jsessionid=E4BF6911E987B94499CEAB78A1AC35CF.buscatextual_0',
      },
    ],
  },
  {
    name: 'Mahmoud Leila',
    initials: 'ML',
    role: 'Assistant Professor, PhD',
    institution:
      'Nazarbayev University, School of Mining and Geosciences',
    summary:
      'Academic collaborator in geological sciences, hydrogen systems, sandstone reservoirs, and applied geoscience modeling.',
    tags: ['Geological Sciences', 'Hydrogen', 'Reservoir Systems'],
    links: [
      {
        label: 'NU Profile',
        href: 'https://research.nu.edu.kz/en/persons/mahmoud-leila/',
      },
    ],
  },
  {
    name: 'Masoud Darvish Ganji',
    initials: 'MG',
    role: 'Research Collaborator',
    institution:
      'Department of BioNano Technology, Gachon University, Republic of Korea',
    summary:
      'Collaborator across computational materials, quantum photonic simulation, hydrogen and energy modeling, and scientific machine-learning workflows.',
    tags: ['Computational Materials', 'Hydrogen', 'Scientific ML'],
    links: [
      {
        label: 'Scholar',
        href: 'https://scholar.google.com/citations?user=56JK5-wAAAAJ&hl=en',
      },
    ],
  },
  {
    name: 'Sonny Irawan',
    initials: 'SI',
    role: 'Associate Professor, PhD',
    institution:
      'Nazarbayev University, Department of Petroleum Engineering',
    summary:
      'Academic collaborator in petroleum engineering, drilling fluids, well repair, water shut-off, and reservoir-engineering workflows.',
    tags: ['Petroleum Engineering', 'Drilling Fluids', 'Reservoir Engineering'],
    links: [
      {
        label: 'NU Profile',
        href: 'https://research.nu.edu.kz/en/persons/irawan-sonny/',
      },
    ],
  },
  {
    name: 'Chinonso Onah',
    initials: 'CO',
    role: 'Research Fellow in Quantum Computing',
    institution: 'Volkswagen Group, Wolfsburg, Germany',
    summary:
      'Collaborator on LiDMaS+, decoder evaluation, surface-code threshold studies, and reproducible QEC workflows.',
    tags: ['Quantum Error Correction', 'LiDMaS+', 'Decoder Evaluation'],
    links: [{ label: 'LinkedIn', href: 'https://de.linkedin.com/in/chinonso-onah' }],
  },
]

const qecHeaderLatticeConfig = {
  x: 58,
  y: 72,
  columns: 13,
  rows: 5,
  columnGap: 88,
  rowGap: 48,
}

const qecHeaderSyndromeBars = [
  { x: 36, y: 92, height: 58, delay: '0s' },
  { x: 54, y: 108, height: 42, delay: '0.18s' },
  { x: 72, y: 82, height: 68, delay: '0.36s' },
  { x: 90, y: 118, height: 32, delay: '0.54s' },
]

const qecHeaderDefects = [
  { column: 1, row: 0, tone: 'cyan', delay: '0s' },
  { column: 3, row: 1, tone: 'magenta', delay: '0.25s' },
  { column: 5, row: 1, tone: 'cyan', delay: '0.5s' },
  { column: 8, row: 3, tone: 'magenta', delay: '0.75s' },
  { column: 2, row: 3, tone: 'amber', delay: '1s' },
  { column: 10, row: 2, tone: 'cyan', delay: '1.2s' },
  { column: 12, row: 4, tone: 'magenta', delay: '1.4s' },
]

const qecHeaderResidualChecks = [
  { x: 156, tone: 'cyan', delay: '0s' },
  { x: 278, tone: 'violet', delay: '0.22s' },
  { x: 400, tone: 'cyan', delay: '0.44s' },
  { x: 522, tone: 'magenta', delay: '0.66s' },
  { x: 644, tone: 'amber', delay: '0.88s' },
  { x: 766, tone: 'violet', delay: '1.1s' },
  { x: 888, tone: 'cyan', delay: '1.32s' },
  { x: 1010, tone: 'magenta', delay: '1.54s' },
]

const wayoWorkflowSteps = [
  {
    label: 'Objective',
    code: 'define_objective()',
    shortCode: 'define_objective()',
    detail: 'Define target application, success metrics, and acceptable logical error thresholds.',
    tone: 'cyan',
  },
  {
    label: 'Encoding',
    code: 'choose_encoding_and_code_family()',
    shortCode: 'choose_encoding()',
    detail: 'Select photonic encoding and QEC code family based on hardware and noise assumptions.',
    tone: 'blue',
  },
  {
    label: 'Backend',
    code: 'realize_physical_qubits_or_backend()',
    shortCode: 'realize_backend()',
    detail: 'Instantiate hardware backend constraints, connectivity, and measurement model.',
    tone: 'violet',
  },
  {
    label: 'Noise',
    code: 'measure_noise()',
    shortCode: 'measure_noise()',
    detail: 'Characterize dominant physical error channels from device or simulator telemetry.',
    tone: 'magenta',
  },
  {
    label: 'GKP Digitization',
    code: 'fit_noise_model_with_GKP_digitization()',
    shortCode: 'fit_GKP_noise()',
    detail: 'Fit calibrated noise parameters and integrate GKP/continuous-variable digitization behavior.',
    tone: 'amber',
  },
  {
    label: 'Compile',
    code: 'compile_logical_circuit()',
    shortCode: 'compile_circuit()',
    detail: 'Compile the logical workload into backend-compatible operations and schedules.',
    tone: 'emerald',
  },
  {
    label: 'Syndromes',
    code: 'generate_syndromes()',
    shortCode: 'generate_syndromes()',
    detail: 'Run fault-injected trials and collect syndrome streams under calibrated noise.',
    tone: 'cyan',
  },
  {
    label: 'Decoders',
    code: 'run_decoders()',
    shortCode: 'run_decoders()',
    detail: 'Evaluate candidate decoders over identical syndrome sets using replayable interfaces.',
    tone: 'blue',
  },
  {
    label: 'Threshold',
    code: 'estimate_LER_vs_PER_across_distances()',
    shortCode: 'estimate_LER_vs_PER()',
    detail: 'Estimate scaling of logical vs physical error rates across code distances and noise sweeps.',
    tone: 'violet',
  },
  {
    label: 'Tune',
    code: 'if (LER >= target) tune_decoder_and_code_distance()',
    shortCode: 'tune_decoder()',
    detail: 'Adjust decoder policies, distances, and noise-mitigation settings when reliability targets are not met.',
    branch: true,
    tone: 'magenta',
  },
  {
    label: 'Validate',
    code: 'validate_logical_stability()',
    shortCode: 'validate_stability()',
    detail: 'Confirm stable logical-qubit behavior under repeated trials and confidence bounds.',
    tone: 'emerald',
  },
  {
    label: 'Applications',
    code: 'deploy_to_applications([hydrogen, hydraulic_fracturing, remote_sensing])',
    shortCode: 'deploy_applications()',
    detail: 'Apply validated logical workflows to domain pipelines and decision-oriented simulations.',
    tone: 'amber',
  },
]

const wayoFocusCards = [
  {
    title: 'Quantum Software and Compilation',
    summary: 'Circuit workflows, differentiable methods, and hardware-aware compilation.',
    tone: 'cyan',
    items: [
      'Photonic circuit simulation (Gaussian + non-Gaussian)',
      'Differentiable programming and variational algorithms',
      'Resource estimation and gate-depth prediction',
      'Algorithm decomposition and hardware mapping',
    ],
  },
  {
    title: 'Quantum Architectures and Fault Tolerance',
    summary: 'Code families, redundancy, error propagation, and decoder-aware evaluation.',
    tone: 'violet',
    items: [
      'Cluster-state photonic computation (MBQC intuition)',
      'Bosonic codes and coherent-state redundancy schemes',
      'Error propagation modeling and QEC-inspired encodings',
    ],
  },
  {
    title: 'Computational Photonics and Materials Modeling',
    summary: 'Numerical physics and first-principles descriptors for photonic systems.',
    tone: 'blue',
    items: [
      'DFT/LR-TDDFT for quantum emitters and rare-earth ions',
      'NLSE propagation, soliton/dispersion modeling, detector physics',
      'MEEP-FDTD validation of chip-scale photonic components',
    ],
  },
  {
    title: 'Real World Applications',
    summary: 'Application-facing pipelines where quantum simulation meets engineering context.',
    tone: 'amber',
    items: [
      'Remote sensing (LiDAR and Sentinel)',
      'Hydrogen production and carbon reduction',
      'Hydraulic fracturing',
    ],
  },
]

const wayoDiagramPositions = [
  { x: 80, y: 80 },
  { x: 435, y: 80 },
  { x: 790, y: 80 },
  { x: 790, y: 240 },
  { x: 435, y: 240 },
  { x: 80, y: 240 },
  { x: 80, y: 400 },
  { x: 435, y: 400 },
  { x: 790, y: 400 },
  { x: 790, y: 560 },
  { x: 435, y: 560 },
  { x: 80, y: 560 },
]

const wayoNodeSize = {
  width: 250,
  height: 92,
}

const software = [
  {
    key: 'Programming',
    description: 'Core implementation languages and systems tooling used across simulation, benchmarking, and automation work.',
    items: [
      {
        name: 'Python',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        description: 'Primary orchestration language for scientific workflows, quantum software, and automation.',
        version: 'Core language',
        href: 'https://www.python.org/',
      },
      {
        name: 'C++',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        description: 'Performance-oriented implementation language for simulation kernels and systems code.',
        version: 'Core language',
        href: 'https://isocpp.org/',
      },
      {
        name: 'Rust',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
        description: 'Memory-safe systems language for reliable tooling and high-performance research software.',
        version: 'Core language',
        href: 'https://www.rust-lang.org/',
      },
      {
        name: 'CUDA',
        logo: 'https://cdn.simpleicons.org/nvidia/76B900',
        description: 'GPU programming stack for accelerated numerical kernels and parallel workloads.',
        version: 'GPU stack',
        href: 'https://developer.nvidia.com/cuda-toolkit',
      },
      {
        name: 'Bash',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
        description: 'Shell automation for reproducible experiments, builds, and environment setup.',
        version: 'Workflow',
        href: 'https://www.gnu.org/software/bash/',
      },
      {
        name: 'Julia',
        logo: 'https://cdn.simpleicons.org/julia/9558B2',
        description: 'High-level technical computing language for numerical prototyping and analysis.',
        version: 'Core language',
        href: 'https://julialang.org/',
      },
      {
        name: 'Swift',
        logo: 'https://cdn.simpleicons.org/swift/F05138',
        description: 'Systems and application language for strongly typed software experiments.',
        version: 'Core language',
        href: 'https://www.swift.org/',
      },
    ],
  },
  {
    key: 'Quantum Stack',
    description: 'Frameworks used for quantum simulation, hardware workflows, calibration, error mitigation, and decoder benchmarking.',
    items: [
      {
        name: 'PennyLane',
        logo: '/pennylane-logo.png',
        logoShape: 'wide',
        description: 'Differentiable quantum programming and hybrid quantum machine-learning workflows.',
        version: '0.45.1',
        href: 'https://pypi.org/project/pennylane/',
      },
      {
        name: 'Qiskit',
        logo: 'https://cdn.simpleicons.org/qiskit/6929C4',
        description: 'Circuit construction, transpilation, IBM Quantum workflows, and QPY/circuit testing.',
        version: '2.4.2',
        href: 'https://pypi.org/project/qiskit/',
      },
      {
        name: 'Cirq',
        logo: 'https://github.com/quantumlib.png?size=96',
        description: 'Python framework for circuit-level research, noisy simulation, and quantum algorithm prototyping.',
        version: '1.6.1',
        href: 'https://pypi.org/project/cirq/',
      },
      {
        name: 'QuTiP',
        logo: '/qutip-logo.svg',
        description: 'Open quantum systems simulation for dynamics, Hamiltonians, and density-matrix workflows.',
        version: '5.3.0',
        href: 'https://pypi.org/project/qutip/',
      },
      {
        name: 'Qibo',
        logo: 'https://github.com/qiboteam.png?size=96',
        description: 'Backend-oriented quantum simulation framework with CPU, GPU, and accelerator workflows.',
        version: '0.3.4',
        href: 'https://pypi.org/project/qibo/',
      },
      {
        name: 'Qibolab',
        logo: 'https://github.com/qiboteam.png?size=96',
        description: 'Hardware-control layer for executing pulse and circuit workflows on self-hosted quantum devices.',
        version: '0.2.15',
        href: 'https://pypi.org/project/qibolab/',
      },
      {
        name: 'Qibocal',
        logo: 'https://github.com/qiboteam.png?size=96',
        description: 'Calibration and characterization protocols for Qibo/Qibolab hardware platforms.',
        version: '0.2.5',
        href: 'https://pypi.org/project/qibocal/',
      },
      {
        name: 'Mitiq',
        logo: 'https://github.com/unitaryfoundation.png?size=96',
        description: 'Quantum error-mitigation toolkit for noise studies, post-processing, and benchmarking tutorials.',
        version: '1.0.0',
        href: 'https://pypi.org/project/mitiq/',
      },
      {
        name: 'Dynamiqs',
        logo: '/dynamiqs-logo.svg',
        description: 'JAX-based differentiable quantum dynamics package for Schrödinger and Lindblad simulations.',
        version: '0.3.4',
        href: 'https://pypi.org/project/dynamiqs/',
      },
      {
        name: 'Stim',
        logo: 'https://github.com/quantumlib.png?size=96',
        description: 'Fast stabilizer-circuit simulator used for QEC sampling and detector-error-model workflows.',
        version: '1.16.0',
        href: 'https://github.com/quantumlib/stim',
      },
    ],
  },
  {
    key: 'Scientific Simulation',
    description: 'Physics simulation tools used for optical materials, photonics, and nonlinear propagation studies.',
    items: [
      {
        name: 'GPAW (TDDFT)',
        logo: '/gpaw-logo.png',
        logoShape: 'wide',
        description: 'DFT and time-dependent DFT workflows for optical descriptors and excited-state response.',
        version: 'Workflow',
        href: 'https://gpaw.readthedocs.io/',
      },
      {
        name: 'MEEP (FDTD)',
        logo: '/meep-logo.png',
        logoShape: 'wide',
        description: 'Finite-difference time-domain electromagnetic simulation for photonic structures.',
        version: 'Workflow',
        href: 'https://meep.readthedocs.io/',
      },
      {
        name: 'NLSE/SSFM',
        logo: '/nlse-ssfm-logo.png',
        logoShape: 'wide',
        description: 'Split-step Fourier modeling for nonlinear optical propagation and pulse evolution.',
        version: 'Method',
        href: 'https://en.wikipedia.org/wiki/Split-step_method',
      },
      {
        name: 'ASE',
        logo: '/ase-logo.png',
        description: 'Atomic Simulation Environment for structure handling and atomistic simulation pipelines.',
        version: 'Workflow',
        href: 'https://wiki.fysik.dtu.dk/ase/',
      },
    ],
  },
  {
    key: 'Machine Learning',
    description: 'Machine-learning tools used for hybrid classical-quantum models and scientific data pipelines.',
    items: [
      {
        name: 'PyTorch',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
        description: 'Deep-learning framework for model development, training loops, and research prototypes.',
        version: 'ML stack',
        href: 'https://pytorch.org/',
      },
      {
        name: 'TensorFlow',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
        description: 'Machine-learning framework for production-oriented models and tensor workflows.',
        version: 'ML stack',
        href: 'https://www.tensorflow.org/',
      },
      {
        name: 'JAX',
        logo: '/jax-logo.png',
        logoShape: 'wide',
        description: 'Composable autodiff and accelerator-backed numerical computing for differentiable simulation.',
        version: 'ML stack',
        href: 'https://jax.readthedocs.io/',
      },
      {
        name: 'PyG (GNNs)',
        logo: '/pyg-logo.png',
        description: 'Graph neural-network workflows for structured scientific data and relational modeling.',
        version: 'Model family',
        href: 'https://pytorch-geometric.readthedocs.io/',
      },
      {
        name: 'PINNs',
        logo: '/pinn-logo.svg',
        description: 'Physics-informed neural-network methods for constraint-aware scientific learning.',
        version: 'Model family',
        href: 'https://www.nature.com/articles/s42254-021-00314-5',
      },
    ],
  },
  {
    key: 'Scientific Computing',
    description: 'Reusable computational patterns behind reproducible HPC and simulation workflows.',
    items: [
      {
        name: 'Numerical Linear Algebra',
        logo: '/linalg-logo.svg',
        description: 'Matrix, eigensolver, sparse, and decomposition workflows used throughout simulation code.',
        version: 'Method',
        href: 'https://netlib.org/lapack/',
      },
      {
        name: 'Automatic Differentiation',
        logo: '/autodiff-logo.svg',
        description: 'Gradient-based modeling and differentiable programming for optimization and learning.',
        version: 'Method',
        href: 'https://jax.readthedocs.io/',
      },
      {
        name: 'Parallel Workflows',
        logo: '/parallel-workflows-logo.svg',
        description: 'Batch, multiprocessing, GPU, and cluster execution patterns for large experiment sweeps.',
        version: 'HPC pattern',
        href: 'https://docs.python.org/3/library/concurrent.futures.html',
      },
      {
        name: 'Linux Environments',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
        description: 'Reproducible local, remote, and cluster environments for scientific software execution.',
        version: 'Runtime',
        href: 'https://www.kernel.org/',
      },
    ],
  },
]

function Layout({ children }) {
  const location = useLocation()
  const tabsRef = useRef(null)
  const scrollAnimationRef = useRef(null)
  const springScrollRef = useRef({
    current: 0,
    target: 0,
    velocity: 0,
  })
  const [visitCount, setVisitCount] = useState(null)
  const [theme, setTheme] = useState(getInitialTheme)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const tabsElement = tabsRef.current

    if (!tabsElement) {
      return
    }

    const activeTab = tabsElement.querySelector('.tab.is-active')

    if (!(activeTab instanceof HTMLElement)) {
      return
    }

    activeTab.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'nearest',
    })
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      window.localStorage.setItem('site-theme', theme)
    } catch {
      // Ignore persistence errors in restricted browsers.
    }
  }, [theme])

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const springState = springScrollRef.current

    function updateScrollProgress() {
      const maxScrollY = getMaxScrollY()
      setScrollProgress(maxScrollY > 0 ? window.scrollY / maxScrollY : 0)

      if (!scrollAnimationRef.current) {
        springState.current = window.scrollY
        springState.target = window.scrollY
        springState.velocity = 0
      }
    }

    function animateSpringScroll() {
      const maxScrollY = getMaxScrollY()
      springState.target = Math.min(maxScrollY, Math.max(0, springState.target))

      const distance = springState.target - springState.current
      springState.velocity += distance * 0.055
      springState.velocity *= 0.68
      springState.current += springState.velocity

      if (Math.abs(distance) < 0.4 && Math.abs(springState.velocity) < 0.4) {
        window.scrollTo(0, springState.target)
        scrollAnimationRef.current = null
        return
      }

      window.scrollTo(0, springState.current)
      scrollAnimationRef.current = window.requestAnimationFrame(animateSpringScroll)
    }

    function shouldUseNativeScroll(event) {
      if (reducedMotionQuery.matches || event.ctrlKey || event.metaKey || event.shiftKey) {
        return true
      }

      const target = event.target instanceof Element ? event.target : null

      if (!target) {
        return false
      }

      if (target.closest('input, textarea, select, [contenteditable="true"]')) {
        return true
      }

      if (target.closest('.tabs, .software-stack-table-wrap, .wayo-diagram-wrap')) {
        return true
      }

      return false
    }

    function handleWheel(event) {
      if (shouldUseNativeScroll(event)) {
        return
      }

      event.preventDefault()

      const deltaScale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1
      const wheelDelta = event.deltaY * deltaScale
      const cappedDelta = Math.max(-260, Math.min(260, wheelDelta))
      const nextTarget = springState.target + cappedDelta

      springState.current = window.scrollY
      springState.target = Math.min(getMaxScrollY(), Math.max(0, nextTarget))

      if (!scrollAnimationRef.current) {
        scrollAnimationRef.current = window.requestAnimationFrame(animateSpringScroll)
      }
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('resize', updateScrollProgress)
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
      window.removeEventListener('wheel', handleWheel)

      if (scrollAnimationRef.current) {
        window.cancelAnimationFrame(scrollAnimationRef.current)
        scrollAnimationRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadVisitCount() {
      let hasCountedInSession = visitCountedInMemory

      try {
        hasCountedInSession =
          hasCountedInSession || sessionStorage.getItem(visitCounterSessionKey) === '1'
      } catch {
        // Ignore sessionStorage read errors in restricted browsers.
      }

      const endpoint = hasCountedInSession ? 'get' : 'hit'
      const counterUrl = `${visitCounterApiBaseUrl}/${endpoint}/${visitCounterKey}`

      try {
        const response = await fetch(counterUrl)

        if (!response.ok) {
          throw new Error(`Visit counter request failed: ${response.status}`)
        }

        const payload = await response.json()
        const parsedValue = Number(payload?.value)

        if (cancelled || Number.isNaN(parsedValue)) {
          return
        }

        setVisitCount(parsedValue)

        if (!hasCountedInSession) {
          visitCountedInMemory = true

          try {
            sessionStorage.setItem(visitCounterSessionKey, '1')
          } catch {
            // Ignore sessionStorage write errors in restricted browsers.
          }
        }
      } catch {
        if (!cancelled) {
          setVisitCount(null)
        }
      }
    }

    loadVisitCount()

    return () => {
      cancelled = true
    }
  }, [])

  const visitCountDisplay = typeof visitCount === 'number' ? visitCount.toLocaleString('en-US') : '--'
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const shouldScrollToTop = scrollProgress > 0.52
  const scrollButtonLabel = shouldScrollToTop ? 'Scroll to top' : 'Scroll to bottom'

  function handleScrollJump() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = shouldScrollToTop ? 0 : getMaxScrollY()

    springScrollRef.current.current = window.scrollY
    springScrollRef.current.target = top
    springScrollRef.current.velocity = 0

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <div className="page-grid">
      <div className="shell">
        <div className="site-gif-header" aria-label="Animated quantum header">
          <QecHeaderTrace />
          <div className="site-gif-overlay" aria-hidden="true"></div>
          <header className="topbar">
            <nav ref={tabsRef} className="tabs" aria-label="Primary">
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
              <button
                className="theme-toggle"
                type="button"
                aria-label={`Switch to ${nextTheme} theme`}
                title={`Switch to ${nextTheme} theme`}
                onClick={() => setTheme(nextTheme)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.4 14.4A7.7 7.7 0 0 1 9.6 3.6 8.5 8.5 0 1 0 20.4 14.4Z" />
                </svg>
              </button>
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
              (c) Copyright {new Date().getFullYear()} Dennis Wayo. Last updated:{' '}
              {lastUpdatedDateLabel}.{' '}
              <span className="footer-visit-counter" aria-label={`Visit count ${visitCountDisplay}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>{visitCountDisplay}</span>
              </span>
            </p>
          </div>
        </footer>
        <button
          className={`floating-scroll-button ${shouldScrollToTop ? 'is-up' : 'is-down'}`}
          type="button"
          aria-label={scrollButtonLabel}
          title={scrollButtonLabel}
          onClick={handleScrollJump}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4 5.5 10.5l1.4 1.4L11 7.8V20h2V7.8l4.1 4.1 1.4-1.4L12 4Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function BadgeStrip() {
  return (
    <section className="credly-strip" aria-label="Credential badge highlights">
      <h2>Credentials & Badges</h2>
      <div className="badge-group-stack">
        {badgeGroups.map((group) => {
          const tickerItems = buildTickerItems(
            group.items,
            group.type === 'credly' ? 8 : 6,
          )

          return (
            <article className="badge-group" key={group.key}>
              <h3>{group.label}</h3>
              <div className="credly-marquee">
                <div className="credly-track">
                  {[0, 1].map((duplicateIndex) =>
                    group.type === 'credly' ? (
                      <div
                        className="credly-badge-row"
                        key={`${group.key}-credly-row-${duplicateIndex}`}
                      >
                        {tickerItems.map((badgeId, itemIndex) => (
                          <div
                            key={`${badgeId}-${itemIndex}-${duplicateIndex}`}
                            className="credly-badge-embed"
                            data-iframe-width="150"
                            data-iframe-height="270"
                            data-share-badge-id={badgeId}
                            data-share-badge-host="https://www.credly.com"
                          ></div>
                        ))}
                      </div>
                    ) : (
                      <div
                        className="pennylane-badge-row"
                        key={`${group.key}-link-row-${duplicateIndex}`}
                      >
                        {tickerItems.map((item, itemIndex) => (
                          <a
                            key={`${item.href}-${item.title}-${itemIndex}-${duplicateIndex}`}
                            className="pennylane-badge-card"
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.image ? (
                              <figure className="pennylane-badge-media">
                                <img
                                  src={item.image}
                                  alt={item.imageAlt || item.title}
                                  loading="lazy"
                                />
                              </figure>
                            ) : null}
                            <div className="pennylane-badge-copy">
                              <span className="pennylane-badge-label">PennyLane</span>
                              <span className="pennylane-badge-title">{item.title}</span>
                              <span className="pennylane-badge-subtitle">
                                {item.subtitle}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function LinkedInEmbedCard({ className, title }) {
  const [shouldLoadEmbed, setShouldLoadEmbed] = useState(false)

  return (
    <div className={className}>
      {shouldLoadEmbed ? (
        <iframe
          src={linkedInEmbedUrl}
          width="504"
          height="584"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          title={title}
        ></iframe>
      ) : (
        <div className="linkedin-embed-placeholder">
          <div className="linkedin-embed-mark" aria-hidden="true">
            in
          </div>
          <div className="linkedin-embed-copy">
            <p className="eyebrow">LinkedIn Post</p>
            <h3>Research update from Dennis Wayo</h3>
            <p>
              A live LinkedIn card is available on demand, with the direct post kept one
              click away when third-party embeds are blocked.
            </p>
          </div>
          <div className="linkedin-embed-actions">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setShouldLoadEmbed(true)}
            >
              Load post
            </button>
            <a className="btn btn-secondary" href={linkedInPostUrl} target="_blank" rel="noreferrer">
              Open on LinkedIn
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

function AboutPage() {
  return (
    <Layout>
      <section className="page about-page">
        <div className="hero-grid">
          <article className="about-story">
            <h1>Dennis Wayo, PhD</h1>
            <span className="about-title-rule" aria-hidden="true"></span>
            <p className="lead">
              I build scientific software where quantum theory, numerical modeling, and
              systems engineering meet. My work centers on creating simulation and
              benchmarking infrastructure that is rigorous enough for publication and stable
              enough for repeatable experimentation.
            </p>
            <p>
              My technical trajectory spans mechanical, petroleum, and chemical engineering,
              and now extends into advanced computer science and quantum simulation. That
              path shaped my engineering style: begin from physical constraints, design
              software architectures for reproducibility, and then optimize for scale.
            </p>
            <p>
              I hold a PhD in Chemical Engineering and am currently pursuing an extended PhD
              in Computer Science at TU Bergakademie Freiberg (TUBAF), alongside an MS in
              Computer Science (Computing Systems) at the Georgia Institute of Technology.
              My specialization includes graduate algorithms, quantum computing and hardware,
              machine learning, natural language processing, high-performance computing,
              high-performance computing architecture, software architecture and design,
              embedded-systems optimization, and advanced operating systems.
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
              <a className="btn btn-primary" href="/MyCV.pdf" download="dennis-wayo-cv.pdf">
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
                <p className="portrait-name">Dennis Wayo, PhD</p>
                <p className="portrait-title">Quantum Systems Architect</p>
                <p>53 Kabanbay Batyr Ave Astana, Kazakhstan, 010000</p>
              </figcaption>
            </figure>
            <article className="panel news-feed-panel">
              <h2>News Feed</h2>
              <LinkedInEmbedCard className="linkedin-feed" title="Embedded LinkedIn post" />
              <div className="news-publications">
                <h3>Recent News & Publications</h3>
                <div className="news-paper-marquee" aria-label="Continuous publication feed">
                  <div className="news-paper-track">
                    <ul className="news-paper-list">
                      {newsFeedPapers.map((item) => (
                        <li className="news-paper-item" key={item.title}>
                          <a href={item.href || item.scholarUrl} target="_blank" rel="noreferrer">
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
                          <a
                            href={item.href || item.scholarUrl}
                            target="_blank"
                            rel="noreferrer"
                            tabIndex={-1}
                          >
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
      </section>
    </Layout>
  )
}

function BlogPage() {
  const [mediumPosts, setMediumPosts] = useState([])
  const [mediumStatus, setMediumStatus] = useState('loading')

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
          Live feed from LinkedIn and Medium, plus technical writing, talks, credentials,
          and updates that document simulation systems, benchmarking methodology, and
          reproducibility practices.
        </p>
        <article className="panel blog-feature-card">
          <div className="blog-feature-copy">
            <p className="eyebrow">Featured OSS update</p>
            <h2>UnitaryHack 2026 open-source contributions</h2>
            <p>
              My UnitaryHack profile records three completed bounty contributions across
              PennyLane, Qibo, and Qiskit, with $175 claimed through the Unitary Foundation
              open-source hackathon.
            </p>
            <ul className="blog-feature-list">
              <li>
                <span>PennyLane</span>
                Documentation tests for the shadows module.
              </li>
              <li>
                <span>Qibo/Qibolab</span>
                Dynamiqs integration as a simulation engine.
              </li>
              <li>
                <span>Qiskit</span>
                Label support for single-gate helpers.
              </li>
            </ul>
            <div className="blog-feature-actions">
              <a
                className="btn btn-primary"
                href={unitaryHackProfileUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open UnitaryHack Profile
              </a>
              <a
                className="btn btn-secondary"
                href="https://github.com/DennisWayo"
                target="_blank"
                rel="noreferrer"
              >
                View GitHub
              </a>
            </div>
          </div>
          <a
            className="blog-feature-preview"
            href={unitaryHackProfileUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Dennis Wayo UnitaryHack 2026 hacker profile"
          >
            <img
              src="/unitaryhack-profile-card.svg"
              alt="UnitaryHack 2026 profile summary for DennisWayo"
            />
          </a>
        </article>
        <BadgeStrip />
        <section className="blog-talks-section" aria-label="Talks and media">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Talks & Media</p>
              <h2>Research Narratives</h2>
            </div>
          </div>
          <div className="grid three blog-talks-grid">
            {talks.map((talk) => (
              <article className="panel blog-talk-card" key={talk.title}>
                <h3>{talk.title}</h3>
                <p>{talk.summary}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="grid two blog-live-grid">
          <article className="panel blog-feed-panel">
            <h2>LinkedIn Live Feed</h2>
            <LinkedInEmbedCard className="blog-linkedin-frame" title="LinkedIn live feed" />
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
  const spotlightPublication = publications.find((item) => item.key === publicationSpotlight.key)

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
        {spotlightPublication ? (
          <article className="publication-spotlight">
            <a
              className="publication-spotlight-link"
              href={spotlightPublication.paperUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open spotlight paper: ${spotlightPublication.title}`}
            >
              <span className="publication-spotlight-label">{publicationSpotlight.label}</span>
              <figure className="publication-spotlight-media">
                <img src={publicationSpotlight.image} alt={publicationSpotlight.imageAlt} />
              </figure>
            </a>
          </article>
        ) : null}
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
        <section className="oss-section" aria-label="Open-source quantum software contributions">
          <h2 className="projects-subtitle">Open-Source Contributions</h2>
          <div className="oss-grid">
            {openSourceContributions.map((item) => (
              <article
                className="oss-card"
                key={`${item.project}-${item.scope}`}
                aria-label={`${item.project}: ${item.scope}`}
              >
                <div className="oss-card-header">
                  <div className="oss-title-wrap">
                    <span
                      className={`oss-icon ${item.iconTone ? `is-${item.iconTone}` : ''}`}
                      aria-hidden="true"
                    >
                      {item.icon ? <img src={item.icon} alt="" /> : item.iconText}
                    </span>
                    <div>
                      {item.hideProjectLabel ? null : <p className="meta">{item.project}</p>}
                      <h3>{item.scope}</h3>
                    </div>
                  </div>
                  <span className="oss-status">{item.status}</span>
                </div>
                <p>{item.summary}</p>
                <div className="oss-link-row">
                  {item.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="metrics-section" aria-label="GitHub card">
          <h2 className="projects-subtitle">GitHub Metrics</h2>
          <div className="metrics-grid">
            <article className="metric-card is-featured">
              <a
                className="metric-link metric-profile-link"
                href={githubProfileUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Dennis Wayo GitHub contributions"
              >
                <div className="metric-core metric-contrib-head">
                  <h3>Contribution Activity</h3>
                </div>
                <figure className="metric-media metric-contrib-media">
                  <img
                    className="github-contrib-image"
                    src={githubContributionChartUrl}
                    alt={`${githubUsername} contribution activity chart`}
                    loading="lazy"
                  />
                </figure>
              </a>
            </article>
            {githubMetrics.map((item) => (
              <article
                className={`metric-card ${item.featured ? 'is-featured' : ''} ${
                  item.type === 'core-languages' ? 'is-language-card' : ''
                }`}
                key={item.title}
              >
                {item.type === 'core-languages' ? (
                  <div className="metric-core">
                    <h3>{item.title}</h3>
                    <ul className="metric-language-list">
                      {item.languages.map((language) => (
                        <li key={language.name}>
                          <img
                            src={language.logo}
                            alt={`${language.name} logo`}
                            title={language.name}
                          />
                          <span className="metric-language-name">{language.name}</span>
                        </li>
                      ))}
                    </ul>
                    <p>{item.note}</p>
                  </div>
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
          2025/2026. The mentorship focused on hands-on quantum machine learning, where
          participants connected first-principles optical descriptors, hybrid
          classical-quantum modeling, reproducible code, and publication-ready results.
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
          <h2>Featured Published Paper</h2>
          <p>
            Featured paper from the 2025/2026 mentorship cycle, now published in
            Advanced Theory and Simulations.
          </p>
          <div className="mentoring-links">
            <a
              className="btn btn-secondary"
              href="https://www.advtheorysimul.com"
              target="_blank"
              rel="noreferrer"
            >
              Open Journal
            </a>
          </div>
          <figure className="mentoring-paper-media">
            <img
              src="/advanced-theory-simulations-2026.png"
              alt="Advanced Theory and Simulations published paper screenshot"
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
            Six domains that define how I connect scientific theory, software engineering,
            and reproducible computational practice.
          </p>
          <div className="story-grid">
            {colabStoryFrames.map((item, index) => (
              <article
                className="story-card"
                key={item.title}
                style={{ '--story-index': index }}
              >
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
        <section className="collaborators-section" aria-label="Collaborators and research network">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Collaborators</p>
              <h2>Research Network</h2>
            </div>
          </div>
          <div className="collaborator-grid">
            {collaborators.map((person) => (
              <article className="collaborator-card" key={person.name}>
                <div className="collaborator-card-head">
                  <span className="collaborator-avatar" aria-hidden="true">
                    {person.initials}
                  </span>
                  <div>
                    <h3>{person.name}</h3>
                    <p>{person.role}</p>
                  </div>
                </div>
                <p className="collaborator-institution">{person.institution}</p>
                <p>{person.summary}</p>
                <div className="collaborator-tags" aria-label={`${person.name} collaboration areas`}>
                  {person.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="collaborator-links">
                  {person.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
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
        <div className="software-stack-grid">
          {software.map((item) => (
            <article
              className="panel software-stack-panel"
              key={item.key}
            >
              <div className="software-stack-head">
                <h2>{item.key}</h2>
                <p>{item.description}</p>
              </div>
              <div className="software-stack-table-wrap">
                <table className="software-stack-table">
                  <thead>
                    <tr>
                      <th scope="col">Software</th>
                      <th scope="col">Description</th>
                      <th scope="col">Version / Status</th>
                      <th scope="col">Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.items.map((tool) => (
                      <tr key={tool.name}>
                        <th scope="row">
                          <span className="software-tool">
                            {tool.logo ? (
                              <span
                                className={`software-icon-tile ${
                                  tool.logoShape === 'wide' ? 'is-wide' : ''
                                }`}
                                aria-hidden="true"
                              >
                                <img src={tool.logo} alt="" />
                              </span>
                            ) : (
                              <span className="tool-fallback" aria-hidden="true">
                                {tool.name.slice(0, 2).toUpperCase()}
                              </span>
                            )}
                            <span>{tool.name}</span>
                          </span>
                        </th>
                        <td>{tool.description}</td>
                        <td>
                          <span className="software-version">{tool.version}</span>
                        </td>
                        <td>
                          <a href={tool.href} target="_blank" rel="noreferrer">
                            Open
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function QecHeaderTrace() {
  const { x, y, columns, rows, columnGap, rowGap } = qecHeaderLatticeConfig
  const node = (column, row) => ({
    x: x + column * columnGap,
    y: y + row * rowGap,
  })
  const point = ({ column, row, dx = 0, dy = 0 }) => {
    const position = node(column, row)

    return `${position.x + dx} ${position.y + dy}`
  }
  const rowIndexes = Array.from({ length: rows }, (_, index) => index)
  const columnIndexes = Array.from({ length: columns }, (_, index) => index)
  const latticeNodes = rowIndexes.flatMap((row) =>
    columnIndexes.map((column) => ({ ...node(column, row), key: `${column}-${row}` })),
  )
  const horizontalGrid = rowIndexes
    .map((row) => `M ${point({ column: 0, row })} H ${node(columns - 1, row).x}`)
    .join(' ')
  const verticalGrid = columnIndexes
    .map((column) => `M ${point({ column, row: 0 })} V ${node(column, rows - 1).y}`)
    .join(' ')
  const diagonalGrid = rowIndexes
    .slice(0, -1)
    .flatMap((row) =>
      columnIndexes.slice(0, -1).flatMap((column) => [
        `M ${point({ column, row })} L ${point({ column: column + 1, row: row + 1 })}`,
        `M ${point({ column: column + 1, row })} L ${point({ column, row: row + 1 })}`,
      ]),
    )
    .join(' ')
  const decoderPaths = [
    {
      key: 'top-match',
      className: 'qec-header-decode-path is-hot',
      delay: '0s',
      d: `M ${point({ column: 1, row: 0 })} C ${point({ column: 2, row: 0, dy: 22 })} ${point({
        column: 3,
        row: 1,
        dy: -20,
      })} ${point({ column: 3, row: 1 })} C ${point({ column: 4, row: 1, dy: 18 })} ${point({
        column: 5,
        row: 1,
        dy: -18,
      })} ${point({ column: 5, row: 1 })}`,
    },
    {
      key: 'right-match',
      className: 'qec-header-decode-path is-cool',
      delay: '0.35s',
      d: `M ${point({ column: 5, row: 1 })} C ${point({ column: 6, row: 1, dy: 28 })} ${point({
        column: 7,
        row: 2,
        dy: -20,
      })} ${point({ column: 7, row: 3 })}`,
    },
    {
      key: 'wide-match',
      className: 'qec-header-decode-path is-hot',
      delay: '0.72s',
      d: `M ${point({ column: 8, row: 3 })} C ${point({ column: 9, row: 2, dy: 20 })} ${point({
        column: 10,
        row: 2,
        dy: -16,
      })} ${point({ column: 10, row: 2 })} C ${point({ column: 11, row: 3, dy: 18 })} ${point({
        column: 12,
        row: 4,
        dy: -18,
      })} ${point({ column: 12, row: 4 })}`,
    },
    {
      key: 'lower-match',
      className: 'qec-header-decode-path is-soft',
      delay: '0.6s',
      d: `M ${point({ column: 2, row: 3 })} C ${point({ column: 3, row: 3, dy: -24 })} ${point({
        column: 4,
        row: 2,
        dy: 22,
      })} ${point({ column: 5, row: 2 })} C ${point({ column: 6, row: 2, dy: 24 })} ${point({
        column: 7,
        row: 3,
        dy: -18,
      })} ${point({ column: 7, row: 3 })}`,
    },
    {
      key: 'edge-match',
      className: 'qec-header-decode-path is-soft',
      delay: '1.05s',
      d: `M ${point({ column: 10, row: 2 })} C ${point({ column: 11, row: 1, dy: 22 })} ${point({
        column: 12,
        row: 3,
        dy: -18,
      })} ${point({ column: 12, row: 4 })}`,
    },
  ]
  const correctionPaths = [
    {
      key: 'top-correction',
      delay: '0.2s',
      d: `M ${point({ column: 1, row: 0 })} L ${point({ column: 2, row: 0 })} L ${point({
        column: 3,
        row: 1,
      })} L ${point({ column: 4, row: 1 })} L ${point({ column: 5, row: 1 })} L ${point({
        column: 6,
        row: 2,
      })} L ${point({ column: 7, row: 3 })}`,
    },
    {
      key: 'lower-correction',
      delay: '0.72s',
      d: `M ${point({ column: 2, row: 3 })} L ${point({ column: 3, row: 3 })} L ${point({
        column: 4,
        row: 2,
      })} L ${point({ column: 5, row: 2 })} L ${point({ column: 6, row: 3 })} L ${point({
        column: 7,
        row: 3,
      })}`,
    },
    {
      key: 'wide-correction',
      delay: '1.05s',
      d: `M ${point({ column: 8, row: 3 })} L ${point({ column: 9, row: 3 })} L ${point({
        column: 10,
        row: 2,
      })} L ${point({ column: 11, row: 3 })} L ${point({ column: 12, row: 4 })}`,
    },
  ]

  return (
    <svg
      className="qec-header-trace"
      viewBox="0 0 1180 360"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-labelledby="qec-header-title qec-header-desc"
    >
      <title id="qec-header-title">Animated quantum error-correction trace</title>
      <desc id="qec-header-desc">
        Animated surface-code style lattice showing syndrome defects, decoder matching paths,
        correction traces, and residual checks.
      </desc>
      <defs>
        <linearGradient id="qec-header-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#101010" />
          <stop offset="48%" stopColor="#07090c" />
          <stop offset="100%" stopColor="#12151b" />
        </linearGradient>
        <linearGradient id="qec-header-decode-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#21d3cf" />
          <stop offset="45%" stopColor="#7c8cff" />
          <stop offset="100%" stopColor="#f06aa8" />
        </linearGradient>
        <filter id="qec-header-glow" x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect className="qec-header-panel" x="0" y="0" width="1180" height="360" />
      <text className="qec-header-label" x="44" y="44">
        syndrome acquisition
      </text>
      <text className="qec-header-label" x="940" y="44">
        decoder replay
      </text>
      <g className="qec-header-stream-bars" aria-hidden="true">
        {qecHeaderSyndromeBars.map((bar) => (
          <rect
            className="qec-header-stream-bar"
            key={`${bar.x}-${bar.height}`}
            x={bar.x}
            y={bar.y}
            width="10"
            height={bar.height}
            rx="4"
            style={{ '--pulse-delay': bar.delay }}
          />
        ))}
      </g>
      <g className="qec-header-replay-dots" aria-hidden="true">
        {['cyan', 'violet', 'magenta'].map((tone, index) => (
          <circle
            className={`qec-header-replay-dot is-${tone}`}
            key={tone}
            cx={980 + index * 34}
            cy="92"
            r="8"
            style={{ '--pulse-delay': `${index * 0.24}s` }}
          />
        ))}
        <path className="qec-header-replay-link" d="M 1088 92 H 1144" />
      </g>
      <g className="qec-header-lattice" aria-hidden="true">
        <path className="qec-header-lattice-grid" d={horizontalGrid} />
        <path className="qec-header-lattice-grid" d={verticalGrid} />
        <path className="qec-header-lattice-grid is-diagonal" d={diagonalGrid} />
        {latticeNodes.map((latticeNode) => (
          <circle
            className="qec-header-lattice-node"
            key={latticeNode.key}
            cx={latticeNode.x}
            cy={latticeNode.y}
            r="5"
          />
        ))}
        {decoderPaths.map((path) => (
          <path
            className={path.className}
            d={path.d}
            key={path.key}
            style={{ '--dash-delay': path.delay }}
          />
        ))}
        {correctionPaths.map((path) => (
          <path
            className="qec-header-correction-path"
            d={path.d}
            key={path.key}
            style={{ '--dash-delay': path.delay }}
          />
        ))}
        <path className="qec-header-residual-rail" d="M 118 286 H 1060" />
        {qecHeaderResidualChecks.map((check) => (
          <circle
            className={`qec-header-residual-dot is-${check.tone}`}
            key={check.x}
            cx={check.x}
            cy="286"
            r="7"
            style={{ '--pulse-delay': check.delay }}
          />
        ))}
        {qecHeaderDefects.map((defect) => {
          const position = node(defect.column, defect.row)

          return (
            <circle
              className={`qec-header-defect is-${defect.tone}`}
              key={`${defect.column}-${defect.row}`}
              cx={position.x}
              cy={position.y}
              r="8"
              style={{ '--pulse-delay': defect.delay }}
            />
          )
        })}
      </g>
    </svg>
  )
}

function WayoFlowDiagram() {
  const pathPoints = wayoDiagramPositions.map((position) => ({
    x: position.x + wayoNodeSize.width / 2,
    y: position.y + wayoNodeSize.height / 2,
  }))
  const connectorPath = pathPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  return (
    <figure className="wayo-diagram-wrap">
      <svg
        className="wayo-diagram"
        viewBox="0 0 1120 720"
        role="img"
        aria-labelledby="wayo-diagram-title wayo-diagram-desc"
      >
        <title id="wayo-diagram-title">wayo.ai deterministic quantum workflow</title>
        <desc id="wayo-diagram-desc">
          Animated flowchart showing objective definition, encoding, backend realization, noise
          modeling, compilation, syndrome generation, decoding, threshold estimation, tuning,
          validation, and application deployment.
        </desc>
        <defs>
          <linearGradient id="wayo-flow-gradient" x1="80" y1="80" x2="1040" y2="650">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="24%" stopColor="#60a5fa" />
            <stop offset="48%" stopColor="#a78bfa" />
            <stop offset="72%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <marker
            id="wayo-flow-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path className="wayo-arrow-head" d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
          <filter id="wayo-node-shadow" x="-12%" y="-18%" width="124%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodOpacity="0.18" />
          </filter>
        </defs>
        <path className="wayo-flow-path-base" d={connectorPath} />
        <path
          className="wayo-flow-path-active"
          d={connectorPath}
          markerEnd="url(#wayo-flow-arrow)"
        />
        {wayoWorkflowSteps.map((step, index) => {
          const position = wayoDiagramPositions[index]
          const nodeClassName = `wayo-svg-node is-${step.tone} ${
            step.branch ? 'is-branch' : ''
          }`

          return (
            <g
              className={nodeClassName}
              key={step.code}
              style={{ '--step-index': index }}
              transform={`translate(${position.x} ${position.y})`}
            >
              <title>{`${step.label}: ${step.detail}`}</title>
              <rect
                className="wayo-svg-node-box"
                width={wayoNodeSize.width}
                height={wayoNodeSize.height}
                rx="14"
              />
              <rect className="wayo-svg-node-accent" x="0" y="0" width="250" height="7" rx="4" />
              <circle className="wayo-svg-node-dot" cx="222" cy="24" r="6" />
              <text className="wayo-svg-node-count" x="18" y="26">
                {String(index + 1).padStart(2, '0')}
              </text>
              <text className="wayo-svg-node-title" x="18" y="52">
                {step.label}
              </text>
              <text className="wayo-svg-node-code" x="18" y="74">
                {step.shortCode}
              </text>
            </g>
          )
        })}
      </svg>
    </figure>
  )
}

function WayoAiPage() {
  return (
    <Layout>
      <section className="page wayo-page">
        <h1>wayo.ai</h1>
        <p className="lead">
          wayo.ai is my personal research workflow for turning rough scientific questions
          into testable quantum-software systems. It is the operating pattern I use to move
          from physical assumptions and algorithm choices into reproducible simulations,
          decoder studies, and application-facing results.
        </p>
        <section className="panel wayo-flow" aria-label="Animated personal workflow map">
          <h2>Personal Workflow Map</h2>
          <WayoFlowDiagram />
        </section>
        <section className="wayo-focus-section" aria-label="wayo.ai laser focus domains">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Laser Focus</p>
              <h2>Domains Behind the Workflow</h2>
            </div>
          </div>
          <div className="wayo-focus-grid">
            {wayoFocusCards.map((card, index) => (
              <article
                className={`wayo-focus-card is-${card.tone}`}
                key={card.title}
                style={{ '--card-index': index }}
                tabIndex={0}
              >
                <div className="wayo-focus-card-inner">
                  <div className="wayo-focus-face wayo-focus-front">
                    <span className="wayo-focus-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3>{card.title}</h3>
                    <p>{card.summary}</p>
                  </div>
                  <div className="wayo-focus-face wayo-focus-back">
                    <h3>{card.title}</h3>
                    <ul>
                      {card.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="grid two wayo-support-grid">
          <article className="panel">
            <h2>How I Use It</h2>
            <p>
              The workflow keeps research decisions explicit: define the objective, choose
              the encoding, realize the backend, model noise, compile the circuit, generate
              syndromes, evaluate decoders, tune when thresholds miss the target, and
              validate the result before moving to applications.
            </p>
          </article>
          <article className="panel">
            <h2>Where It Lands</h2>
            <ul className="clean-list">
              <li>Fault-tolerant quantum simulation and decoder benchmarking.</li>
              <li>Photonic, GKP, and hybrid continuous-variable/discrete workflows.</li>
              <li>Application studies in hydrogen, hydraulic fracturing, and remote sensing.</li>
            </ul>
          </article>
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
      <Route path="/talks" element={<Navigate replace to="/blog" />} />
      <Route path="*" element={<Navigate replace to="/about" />} />
    </Routes>
  )
}

export default App
