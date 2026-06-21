// US vaccine excipient data — vaccines are FDA BIOLOGICS (CBER), not in the
// openFDA drug/label dataset, so they can't be looked up live. This bundled,
// citation-backed list was compiled + triple-checked (CDC Pink Book Appendix B,
// Institute for Vaccine Safety, FDA package inserts). 43 vaccines.

export interface Vaccine {
  id: string;
  name: string;
  brand: string;
  manufacturer: string;
  type: string;
  ingredients: string[];
  confirmedAllergens: string[];
  sourceUrl: string;
}

export const VACCINES: Vaccine[] = [
  {
    "id": "comirnaty",
    "name": "COVID-19 Vaccine, mRNA (nucleoside-modified messenger RNA, modRNA)",
    "brand": "Comirnaty",
    "manufacturer": "Pfizer, Inc. / BioNTech (Pfizer Laboratories Div Pfizer Inc.)",
    "type": "mRNA (nucleoside-modified messenger RNA, lipid nanoparticle); FDA-approved (current 2025-2026 Formula label)",
    "ingredients": [
      "Nucleoside-modified messenger RNA (modRNA) encoding the viral spike (S) glycoprotein of SARS-CoV-2 Omicron variant sublineage LP.8.1 (30 mcg per 0.3 mL dose for ages 65+ and 12-64 high-risk; 10 mcg per 0.3 mL dose for ages 5-11 high-risk)",
      "Lipid: ((4-hydroxybutyl)azanediyl)bis(hexane-6,1-diyl)bis(2-hexyldecanoate) [ALC-0315]",
      "Lipid: 2-(polyethylene glycol 2000)-N,N-ditetradecylacetamide [ALC-0159 / PEG-2000 lipid]",
      "Lipid: 1,2-distearoyl-sn-glycero-3-phosphocholine [DSPC]",
      "Lipid: cholesterol",
      "tromethamine",
      "tromethamine hydrochloride",
      "sucrose"
    ],
    "confirmedAllergens": [
      "PEG / polyethylene glycol (present as the PEG-2000 moiety of ALC-0159; primary allergen of concern)",
      "tromethamine (Tris buffer; a rarer secondary allergen of concern)"
    ],
    "sourceUrl": "https://labeling.pfizer.com/ShowLabeling.aspx?id=16351&format=pdf"
  },
  {
    "id": "spikevax",
    "name": "COVID-19 Vaccine, mRNA (nucleoside-modified messenger RNA; elasomeran)",
    "brand": "Spikevax",
    "manufacturer": "Moderna US, Inc.",
    "type": "mRNA (nucleoside-modified messenger RNA, lipid nanoparticle); FDA-approved (current 2025-2026 Formula label)",
    "ingredients": [
      "Nucleoside-modified messenger RNA (mRNA) encoding the pre-fusion stabilized Spike glycoprotein (S) of SARS-CoV-2 Omicron variant sublineage LP.8.1 (50 mcg per 0.5 mL dose; 25 mcg per 0.25 mL dose)",
      "Lipids: SM-102",
      "Lipids: polyethylene glycol [PEG] 2000 dimyristoyl glycerol [DMG] (PEG2000-DMG)",
      "Lipids: cholesterol",
      "Lipids: 1,2-distearoyl-sn-glycero-3-phosphocholine [DSPC]",
      "tromethamine",
      "tromethamine hydrochloride",
      "acetic acid",
      "sodium acetate trihydrate",
      "sucrose"
    ],
    "confirmedAllergens": [
      "PEG (polyethylene glycol) - present as PEG2000-DMG lipid (the only allergen-relevant component; established cause of rare anaphylaxis/PEG hypersensitivity)"
    ],
    "sourceUrl": "https://www.vaccinesafety.edu/wp-content/uploads/2024/10/Components-Excipients-by-Excipient-24-1014.pdf"
  },
  {
    "id": "nuvaxovid-novavax",
    "name": "COVID-19 Vaccine, Adjuvanted (recombinant spike protein subunit; nvx-cov2705)",
    "brand": "Nuvaxovid (Novavax)",
    "manufacturer": "Novavax, Inc.",
    "type": "Protein subunit (recombinant spike protein nanoparticle) with Matrix-M saponin adjuvant; FDA-approved (current 2025-2026 Formula label)",
    "ingredients": [
      "Recombinant spike (rS) protein of SARS-CoV-2 Omicron variant lineage JN.1, 5 mcg (produced by recombinant DNA technology using a baculovirus expression system in the Sf9 insect cell line derived from Spodoptera frugiperda)",
      "Matrix-M adjuvant, 50 mcg total, composed of Fraction-A (42.5 mcg) and Fraction-C (7.5 mcg) of saponin extracts from the soapbark tree, Quillaja saponaria Molina",
      "cholesterol (30.5 mcg)",
      "phosphatidylcholine (23 mcg)",
      "potassium dihydrogen phosphate (3.85 mcg)",
      "potassium chloride (2.25 mcg)",
      "disodium hydrogen phosphate dihydrate (14.7 mcg)",
      "disodium hydrogen phosphate heptahydrate (2.465 mg)",
      "sodium dihydrogen phosphate monohydrate (0.445 mg)",
      "sodium chloride (8.766 mg)",
      "polysorbate 80 (0.050 mg)",
      "Water for Injection",
      "pH adjusted with sodium hydroxide or hydrochloric acid",
      "May also contain residual amounts of: baculovirus and Sf9 cell proteins (<= 0.96 mcg); baculovirus and cellular DNA (<= 0.00016 mcg); lentil lectin (< 0.025 mcg); methyl-alpha-D-mannopyranoside (2 mcg); simethicone (< 0.92 mcg); pluronic F-68 (< 2.19 mcg); Triton X-100 (< 0.025 mcg); Tergitol (NP9) (< 0.05 mcg); DL-alpha-tocopherol (<= 0.05 mcg)"
    ],
    "confirmedAllergens": [
      "polysorbate 80"
    ],
    "sourceUrl": "https://www.medicines.org.uk/emc/product/13827/smpc"
  },
  {
    "id": "fluzone-quadrivalent",
    "name": "Influenza vaccine, quadrivalent, inactivated (standard-dose, egg-based, split-virion)",
    "brand": "Fluzone Quadrivalent",
    "manufacturer": "Sanofi Pasteur",
    "type": "Inactivated, egg-based, split-virion (standard-dose). Note: multi-dose presentation contains thimerosal; single-dose syringes/vials are thimerosal-free.",
    "ingredients": [
      "formaldehyde",
      "egg protein (ovalbumin)",
      "octylphenol ethoxylate (Triton X-100)",
      "sodium phosphate-buffered isotonic sodium chloride solution",
      "thimerosal (multi-dose vials only)"
    ],
    "confirmedAllergens": [
      "egg protein / ovalbumin",
      "formaldehyde",
      "thimerosal (multi-dose vials only)"
    ],
    "sourceUrl": "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=8213c229-a67a-4d3f-bd8f-b8729ae28472"
  },
  {
    "id": "fluzone-high-dose-quadriva",
    "name": "Influenza vaccine, high-dose, inactivated (egg-based, split-virion)",
    "brand": "Fluzone High-Dose Quadrivalent",
    "manufacturer": "Sanofi Pasteur",
    "type": "Inactivated, egg-based, split-virion, high-dose (for ages 65+). Single-dose presentation; thimerosal-free.",
    "ingredients": [
      "egg protein",
      "octylphenol ethoxylate (Triton X-100)",
      "sodium phosphate-buffered isotonic sodium chloride solution",
      "formaldehyde"
    ],
    "confirmedAllergens": [
      "egg / ovalbumin",
      "formaldehyde"
    ],
    "sourceUrl": "https://www.cdc.gov/vaccines/pubs/pinkbook/downloads/appendices/b/excipient-table-2.pdf"
  },
  {
    "id": "fluarix-quadrivalent",
    "name": "Influenza vaccine, quadrivalent, inactivated (egg-based, split-virion)",
    "brand": "Fluarix Quadrivalent",
    "manufacturer": "GlaxoSmithKline (GSK)",
    "type": "Inactivated, egg-based, split-virion (standard-dose). Thimerosal-free.",
    "ingredients": [
      "octoxynol-10 (TRITON X-100)",
      "α-tocopheryl hydrogen succinate",
      "polysorbate 80 (Tween 80)",
      "hydrocortisone",
      "gentamicin sulfate",
      "ovalbumin",
      "formaldehyde",
      "sodium deoxycholate",
      "sodium phosphate-buffered isotonic sodium chloride"
    ],
    "confirmedAllergens": [
      "egg / ovalbumin",
      "polysorbate 80",
      "gentamicin (aminoglycoside antibiotic)",
      "formaldehyde"
    ],
    "sourceUrl": "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Fluarix_Quadrivalent/pdf/FLUARIX-QUADRIVALENT.PDF"
  },
  {
    "id": "flucelvax-quadrivalent",
    "name": "Influenza vaccine, quadrivalent, inactivated (cell culture-based, subunit)",
    "brand": "Flucelvax Quadrivalent",
    "manufacturer": "Seqirus",
    "type": "Inactivated, cell-culture-based (Madin Darby Canine Kidney / MDCK cells), egg-free. Note: multi-dose presentation contains thimerosal; single-dose syringes are thimerosal-free.",
    "ingredients": [
      "Madin Darby Canine Kidney (MDCK) cell protein",
      "phosphate buffered saline",
      "protein other than HA",
      "MDCK cell DNA",
      "polysorbate 80",
      "cetyltrimethylammonium bromide (CTAB)",
      "β-propiolactone",
      "thimerosal (multi-dose vials only)"
    ],
    "confirmedAllergens": [
      "polysorbate 80",
      "thimerosal (multi-dose vials only)",
      "cetyltrimethylammonium bromide",
      "β-propiolactone"
    ],
    "sourceUrl": "https://www.fda.gov/media/115862/download"
  },
  {
    "id": "flublok-quadrivalent",
    "name": "Influenza vaccine, quadrivalent, recombinant hemagglutinin",
    "brand": "Flublok Quadrivalent",
    "manufacturer": "Sanofi Pasteur (Protein Sciences)",
    "type": "Recombinant hemagglutinin, produced in insect (Spodoptera frugiperda) cells via baculovirus expression system; egg-free, no live virus. Thimerosal-free, no antibiotics.",
    "ingredients": [
      "sodium chloride",
      "monobasic sodium phosphate",
      "dibasic sodium phosphate",
      "polysorbate 20 (Tween 20)",
      "baculovirus and Spodoptera frugiperda cell proteins",
      "baculovirus and cellular DNA",
      "Triton X-100"
    ],
    "confirmedAllergens": [
      "polysorbate 20 (Tween 20)",
      "Triton X-100 (octylphenol ethoxylate)",
      "Spodoptera frugiperda insect cell proteins",
      "baculovirus proteins/DNA"
    ],
    "sourceUrl": "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=67de8652-2e5a-4d18-aee9-d9b789ccfe46"
  },
  {
    "id": "flumist-quadrivalent",
    "name": "Influenza vaccine, quadrivalent, live attenuated (intranasal)",
    "brand": "FluMist Quadrivalent",
    "manufacturer": "AstraZeneca (MedImmune)",
    "type": "Live attenuated influenza vaccine (LAIV), egg-based, administered as an intranasal spray. Contains porcine gelatin and egg protein.",
    "ingredients": [
      "monosodium glutamate",
      "hydrolyzed porcine gelatin",
      "arginine",
      "sucrose",
      "dibasic potassium phosphate",
      "monobasic potassium phosphate",
      "ovalbumin",
      "gentamicin sulfate",
      "ethylenediaminetetraacetic acid (EDTA)"
    ],
    "confirmedAllergens": [
      "egg / ovalbumin",
      "gelatin (hydrolyzed porcine, Type A)",
      "gentamicin (aminoglycoside antibiotic)",
      "monosodium glutamate (MSG)",
      "EDTA"
    ],
    "sourceUrl": "https://blk-pediatric-practice.com/wp-content/uploads/2023/06/appdx-full-b.pdf"
  },
  {
    "id": "afluria-quadrivalent",
    "name": "Influenza vaccine, quadrivalent, inactivated (egg-based, split-virion)",
    "brand": "Afluria Quadrivalent",
    "manufacturer": "Seqirus",
    "type": "Inactivated, egg-based, split-virion (standard-dose). Note: multi-dose vials contain thimerosal; single-dose presentations are thimerosal-free.",
    "ingredients": [
      "sodium chloride",
      "monobasic sodium phosphate",
      "dibasic sodium phosphate",
      "monobasic potassium phosphate",
      "potassium chloride",
      "calcium chloride",
      "sodium taurodeoxycholate",
      "ovalbumin",
      "sucrose",
      "neomycin sulfate",
      "polymyxin B",
      "beta-propiolactone",
      "hydrocortisone",
      "thimerosal (multi-dose vials only; ~24.5 mcg mercury per 0.5 mL dose)"
    ],
    "confirmedAllergens": [
      "egg (ovalbumin <1 mcg residual)",
      "neomycin (neomycin sulfate residual)",
      "polymyxin B (residual)",
      "thimerosal / mercury (multi-dose vials only)"
    ],
    "sourceUrl": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a06c4ead-c988-4b10-b832-4d7460fa358f"
  },
  {
    "id": "fluad-quadrivalent",
    "name": "Influenza vaccine, quadrivalent, inactivated, adjuvanted (egg-based, subunit, MF59)",
    "brand": "Fluad Quadrivalent",
    "manufacturer": "Seqirus",
    "type": "Inactivated, egg-based, adjuvanted subunit vaccine (MF59 adjuvant = squalene-based oil-in-water emulsion); for ages 65+. Thimerosal-free.",
    "ingredients": [
      "squalene",
      "polysorbate 80",
      "sorbitan trioleate",
      "sodium citrate dihydrate",
      "citric acid monohydrate",
      "neomycin",
      "kanamycin",
      "barium sulfate",
      "hydrocortisone",
      "egg protein (ovalbumin)",
      "cetyltrimethylammonium bromide (CTAB)",
      "formaldehyde"
    ],
    "confirmedAllergens": [
      "egg protein (ovalbumin)",
      "polysorbate 80",
      "neomycin",
      "kanamycin",
      "formaldehyde"
    ],
    "sourceUrl": "https://www.cdc.gov/vaccines/pubs/pinkbook/downloads/appendices/b/excipient-table-2.pdf"
  },
  {
    "id": "m-m-r-ii",
    "name": "Measles, Mumps, and Rubella Virus Vaccine Live (MMR)",
    "brand": "M-M-R II",
    "manufacturer": "Merck & Co., Inc. (Merck Sharp & Dohme)",
    "type": "Live attenuated viral vaccine (combined measles, mumps, rubella)",
    "ingredients": [
      "Measles Virus Vaccine Live (attenuated Enders' Edmonston strain) propagated in chick embryo cell culture",
      "Mumps Virus Vaccine Live (Jeryl Lynn [Level B] strain) propagated in chick embryo cell culture",
      "Rubella Virus Vaccine Live (Wistar RA 27/3 strain) propagated in WI-38 human diploid lung fibroblasts",
      "sorbitol (14.5 mg)",
      "sucrose (1.9 mg)",
      "hydrolyzed gelatin (14.5 mg)",
      "recombinant human albumin (≤0.3 mg)",
      "fetal bovine serum (<1 ppm)",
      "neomycin (approximately 25 mcg)",
      "sodium phosphate",
      "sodium chloride",
      "glutamate (monosodium glutamate)",
      "vitamins",
      "amino acids",
      "other buffer and media ingredients"
    ],
    "confirmedAllergens": [
      "egg / chick embryo (measles and mumps propagated in chick embryo cell culture; dedicated 'Hypersensitivity to Eggs' warning in PI section 5.2)",
      "gelatin (hydrolyzed gelatin; contraindicated in those with hypersensitivity to gelatin, PI 4.1)",
      "neomycin (~25 mcg; contraindicated in those with history of anaphylaxis to neomycin, PI 4.1)",
      "fetal bovine serum (bovine-derived, <1 ppm)",
      "recombinant human albumin (≤0.3 mg)",
      "sorbitol",
      "sucrose",
      "glutamate / MSG (listed by CDC Pink Book Appendix B)"
    ],
    "sourceUrl": "https://www.merck.com/product/usa/pi_circulars/m/mmr_ii/mmr_ii_pi.pdf"
  },
  {
    "id": "proquad",
    "name": "Measles, Mumps, Rubella and Varicella Virus Vaccine Live (MMRV)",
    "brand": "ProQuad",
    "manufacturer": "Merck & Co., Inc. (Merck Sharp & Dohme)",
    "type": "Live attenuated viral vaccine (combined measles, mumps, rubella, varicella)",
    "ingredients": [
      "Measles Virus Vaccine Live (more attenuated Enders' Edmonston strain) propagated in chick embryo cell culture",
      "Mumps Virus Vaccine Live (Jeryl Lynn [B level] strain) propagated in chick embryo cell culture",
      "Rubella Virus Vaccine Live (Wistar RA 27/3 strain) propagated in WI-38 human diploid lung fibroblasts",
      "Varicella Virus Vaccine Live (Oka/Merck strain of varicella-zoster virus) propagated in MRC-5 cells",
      "sucrose (21 mg)",
      "hydrolyzed gelatin (11 mg)",
      "sodium chloride (2.4 mg)",
      "sorbitol (1.8 mg)",
      "monosodium L-glutamate (0.40 mg)",
      "sodium phosphate dibasic (0.34 mg)",
      "recombinant human albumin (0.31 mg)",
      "sodium bicarbonate (0.17 mg)",
      "potassium phosphate monobasic (72 mcg)",
      "potassium chloride (60 mcg)",
      "potassium phosphate dibasic (36 mcg)",
      "residual components from manufacturing process: MRC-5 cells including DNA and protein",
      "neomycin (<16 mcg)",
      "bovine calf serum (≤0.5 mcg)",
      "other buffer and media ingredients",
      "No preservative"
    ],
    "confirmedAllergens": [
      "hydrolyzed gelatin",
      "neomycin",
      "monosodium L-glutamate (MSG)",
      "bovine calf serum (bovine-derived)",
      "sorbitol",
      "sucrose",
      "recombinant human albumin",
      "chick embryo cell culture-derived material (measles and mumps components) — NOT true egg/ovalbumin"
    ],
    "sourceUrl": "https://www.cdc.gov/vaccines/pubs/pinkbook/downloads/appendices/b/excipient-table-2.pdf"
  },
  {
    "id": "varivax",
    "name": "Varicella Virus Vaccine Live (chickenpox vaccine)",
    "brand": "Varivax",
    "manufacturer": "Merck & Co., Inc. (Merck Sharp & Dohme)",
    "type": "Live attenuated viral vaccine (varicella/chickenpox)",
    "ingredients": [
      "Varicella Virus Vaccine Live (Oka/Merck strain of varicella-zoster virus), minimum 1350 PFU, propagated in MRC-5 human diploid cells",
      "sucrose (approximately 24 mg)",
      "hydrolyzed gelatin (12.0 mg)",
      "sodium chloride (3.1 mg)",
      "monosodium L-glutamate (0.5 mg)",
      "sodium phosphate dibasic (0.44 mg)",
      "potassium phosphate monobasic (0.08 mg)",
      "potassium chloride (0.08 mg)",
      "residual components of MRC-5 cells including DNA and protein",
      "sodium phosphate monobasic (trace quantities)",
      "EDTA (ethylenediaminetetraacetic acid) (trace quantities)",
      "neomycin (trace quantities)",
      "fetal bovine serum (trace quantities)",
      "Allergen-relevant note: contains hydrolyzed gelatin; neomycin; monosodium L-glutamate; fetal bovine serum; EDTA; sucrose"
    ],
    "confirmedAllergens": [
      "gelatin (hydrolyzed gelatin)",
      "neomycin (antibiotic)",
      "monosodium L-glutamate (MSG)",
      "fetal bovine serum (bovine protein)",
      "EDTA",
      "sucrose"
    ],
    "sourceUrl": "https://blk-pediatric-practice.com/wp-content/uploads/2023/06/appdx-full-b.pdf"
  },
  {
    "id": "shingrix",
    "name": "Zoster Vaccine Recombinant, Adjuvanted (shingles vaccine)",
    "brand": "Shingrix",
    "manufacturer": "GlaxoSmithKline Biologicals (GSK)",
    "type": "Recombinant subunit, adjuvanted (non-live) shingles vaccine",
    "ingredients": [
      "Recombinant varicella zoster virus glycoprotein E (gE) antigen, 50 mcg, obtained by culturing genetically engineered Chinese Hamster Ovary (CHO) cells carrying a truncated gE gene, in media containing amino acids, with no albumin, antibiotics, or animal-derived proteins",
      "AS01B adjuvant system (combined in a liposomal formulation)",
      "3-O-desacyl-4'-monophosphoryl lipid A (MPL), 50 mcg, derived from Salmonella minnesota",
      "QS-21, 50 mcg, a saponin purified from plant extract Quillaja saponaria Molina",
      "dioleoyl phosphatidylcholine (DOPC), 1 mg",
      "cholesterol, 0.25 mg",
      "sucrose, 20 mg (stabilizer)",
      "sodium chloride, 4.385 mg",
      "potassium dihydrogen phosphate, 0.54 mg",
      "sodium dihydrogen phosphate dihydrate, 0.160 mg (PREFILLED SYRINGE presentation only)",
      "sodium dihydrogen phosphate anhydrous, 0.160 mg (VIAL presentation only)",
      "disodium phosphate anhydrous, 0.15 mg",
      "dipotassium phosphate, 0.116 mg",
      "polysorbate 80, 0.08 mg",
      "residual host cell proteins (≤3.0%)",
      "residual DNA (≤2.1 picograms)",
      "water for injection (in adjuvant suspension / liposomal formulation)"
    ],
    "confirmedAllergens": [
      "polysorbate 80 (0.08 mg)",
      "QS-21 saponin (plant-derived, from Quillaja saponaria Molina)"
    ],
    "sourceUrl": "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Shingrix/pdf/SHINGRIX.PDF"
  },
  {
    "id": "zostavax",
    "name": "Zoster Vaccine Live (shingles vaccine)",
    "brand": "Zostavax",
    "manufacturer": "Merck & Co., Inc. (Merck Sharp & Dohme)",
    "type": "Live attenuated viral vaccine (shingles) — DISCONTINUED in the U.S. (Merck stopped U.S. sales November 18, 2020; last U.S. doses expired November 2020). No longer available in the United States.",
    "ingredients": [
      "Oka/Merck strain of varicella-zoster virus (VZV), minimum 19,400 PFU, propagated in MRC-5 cells",
      "sucrose (31.16 mg)",
      "hydrolyzed porcine gelatin (15.58 mg)",
      "sodium chloride (3.99 mg)",
      "monosodium L-glutamate (0.62 mg)",
      "sodium phosphate dibasic (0.57 mg)",
      "potassium phosphate monobasic (0.10 mg)",
      "potassium chloride (0.10 mg)",
      "residual components of MRC-5 (human diploid) cells including DNA and protein",
      "neomycin (trace quantities)",
      "bovine calf serum (trace quantities)",
      "urea (present in the Refrigerator-Stable formulation only; NOT in the Frozen formulation)",
      "Allergen-relevant note: contains hydrolyzed PORCINE gelatin; neomycin; monosodium L-glutamate; bovine calf serum; sucrose"
    ],
    "confirmedAllergens": [
      "hydrolyzed porcine gelatin (porcine/pork-derived)",
      "neomycin (antibiotic, trace)",
      "monosodium L-glutamate (MSG)",
      "bovine calf serum (bovine/beef-derived, trace)",
      "sucrose"
    ],
    "sourceUrl": "https://www.cdc.gov/vaccines/pubs/pinkbook/downloads/appendices/b/excipient-table-2.pdf"
  },
  {
    "id": "adacel",
    "name": "Tetanus Toxoid, Reduced Diphtheria Toxoid and Acellular Pertussis Vaccine, Adsorbed (Tdap)",
    "brand": "Adacel",
    "manufacturer": "Sanofi Pasteur",
    "type": "Tdap (tetanus, diphtheria, acellular pertussis booster); inactivated toxoid/subunit; aluminum-adjuvanted; preservative-free; licensed/in use",
    "ingredients": [
      "Tetanus toxoid (5 Lf)",
      "Diphtheria toxoid (2 Lf)",
      "Acellular pertussis antigens: detoxified pertussis toxin (PT) 2.5 mcg, filamentous hemagglutinin (FHA) 5 mcg, pertactin (PRN) 3 mcg, fimbriae types 2 and 3 (FIM) 5 mcg",
      "Aluminum phosphate (adjuvant) 1.5 mg (0.33 mg aluminum)",
      "2-phenoxyethanol 3.3 mg (0.6% v/v) (not as a preservative)",
      "Residual formaldehyde (<=5 mcg)",
      "Residual glutaraldehyde (<50 ng)",
      "Water for injection",
      "Manufacturing/residual media components: casamino acids, dimethyl-beta-cyclodextrin (Stainer-Scholte medium for pertussis), modified Mueller-Miller casamino acid medium (tetanus), modified Mueller's growth medium (diphtheria), ammonium sulfate (fractionation)",
      "No preservative"
    ],
    "confirmedAllergens": [
      "aluminum (aluminum phosphate adjuvant, 0.33 mg aluminum)",
      "formaldehyde (residual, <=5 mcg)",
      "glutaraldehyde (residual, <50 ng)",
      "latex (NOT in single-dose vial stopper; historically present in tip caps of SOME lots of the prefilled-syringe presentation per CDC Pink Book; current PI says none)",
      "2-phenoxyethanol (not an allergen on the requested list, but present as a stabilizer)"
    ],
    "sourceUrl": "https://www.cdc.gov/vaccines/pubs/pinkbook/downloads/appendices/b/excipient-table-2.pdf"
  },
  {
    "id": "boostrix",
    "name": "Tetanus Toxoid, Reduced Diphtheria Toxoid and Acellular Pertussis Vaccine, Adsorbed (Tdap)",
    "brand": "Boostrix",
    "manufacturer": "GlaxoSmithKline (GSK) Biologicals",
    "type": "Tdap (tetanus, diphtheria, acellular pertussis booster); inactivated toxoid/subunit; aluminum-adjuvanted; preservative-free; licensed/in use",
    "ingredients": [
      "Tetanus toxoid (5 Lf)",
      "Diphtheria toxoid (2.5 Lf)",
      "Inactivated pertussis toxin (PT) 8 mcg",
      "Filamentous hemagglutinin (FHA) 8 mcg",
      "Pertactin (PRN, 69 kiloDalton outer membrane protein) 2.5 mcg",
      "Aluminum hydroxide (adjuvant) (formulated to contain 0.3 mg aluminum)",
      "Sodium chloride 4.4 mg",
      "Residual formaldehyde (<=100 mcg)",
      "Polysorbate 80 (Tween 80) (<=100 mcg)",
      "Glutaraldehyde (used with formaldehyde to detoxify PT; residual amount not specified)",
      "Bovine casein (modified Latham medium for tetanus toxin culture)",
      "Bovine extract (Fenton medium for diphtheria toxin culture)",
      "Modified Stainer-Scholte liquid medium (pertussis antigen culture)",
      "No preservative (formulated without preservatives)"
    ],
    "confirmedAllergens": [
      "Aluminum (aluminum hydroxide adjuvant, 0.3 mg aluminum)",
      "Formaldehyde (residual, <=100 mcg)",
      "Polysorbate 80 (Tween 80, <=100 mcg)",
      "Glutaraldehyde (manufacturing detoxifying agent, residual)",
      "Bovine casein (milk-derived, from Latham culture medium)",
      "Bovine extract (from Fenton culture medium)"
    ],
    "sourceUrl": "https://www.vaccinesafety.edu/wp-content/uploads/2024/10/Components-Excipients-by-Vaccine-Name-24-1014.pdf"
  },
  {
    "id": "daptacel",
    "name": "Diphtheria and Tetanus Toxoids and Acellular Pertussis Vaccine Adsorbed (DTaP)",
    "brand": "Daptacel",
    "manufacturer": "Sanofi Pasteur",
    "type": "DTaP (pediatric diphtheria, tetanus, acellular pertussis primary series); inactivated toxoid/subunit; aluminum-adjuvanted; preservative-free; licensed/in use",
    "ingredients": [
      "Diphtheria toxoid (15 Lf)",
      "Tetanus toxoid (5 Lf)",
      "Acellular pertussis antigens: detoxified pertussis toxin (PT) 10 mcg, filamentous hemagglutinin (FHA) 5 mcg, pertactin (PRN) 3 mcg, fimbriae types 2 and 3 (FIM) 5 mcg",
      "Aluminum phosphate (adjuvant) 1.5 mg (0.33 mg of aluminum)",
      "2-phenoxyethanol 3.3 mg (0.6% v/v) (not as a preservative)",
      "Residual formaldehyde (<=5 mcg)",
      "Residual glutaraldehyde (<50 ng)",
      "Water for injection",
      "Bovine casamino acids (stabilizer; bovine/cow-derived per IVS)",
      "Dimethyl-beta-cyclodextrin (Stainer-Scholte medium nutrient for pertussis)",
      "Ammonium sulfate (protein purification/fractionation)",
      "Modified Mueller-Miller casamino acid medium without beef heart infusion (tetanus growth medium)",
      "Modified Mueller's growth medium (diphtheria growth medium)"
    ],
    "confirmedAllergens": [
      "aluminum (aluminum phosphate, 0.33 mg aluminum)",
      "formaldehyde (residual, <=5 mcg)"
    ],
    "sourceUrl": "https://www.vaccinesafety.edu/wp-content/uploads/2024/10/Components-Excipients-by-Vaccine-Name-24-1014.pdf"
  },
  {
    "id": "infanrix",
    "name": "Diphtheria and Tetanus Toxoids and Acellular Pertussis Vaccine Adsorbed (DTaP)",
    "brand": "Infanrix",
    "manufacturer": "GlaxoSmithKline (GSK) Biologicals",
    "type": "DTaP (pediatric diphtheria, tetanus, acellular pertussis primary series); inactivated toxoid/subunit; aluminum-adjuvanted; preservative-free; licensed/in use",
    "ingredients": [
      "Diphtheria toxoid (25 Lf)",
      "Tetanus toxoid (10 Lf)",
      "Inactivated pertussis toxin (PT) 25 mcg",
      "Filamentous hemagglutinin (FHA) 25 mcg",
      "Pertactin (69 kiloDalton outer membrane protein) 8 mcg",
      "Aluminum hydroxide (adjuvant) (0.5 mg aluminum)",
      "Sodium chloride 4.4 mg",
      "Residual formaldehyde (<=100 mcg)",
      "Polysorbate 80 (Tween 80) (<=100 mcg)",
      "Glutaraldehyde (used to detoxify PT; residual amount not specified in package insert)",
      "Bovine extract (stabilizer; Fenton medium for diphtheria)",
      "Bovine casein (medium nutrient; modified Latham medium for tetanus)",
      "Modified Stainer-Scholte liquid medium (pertussis)"
    ],
    "confirmedAllergens": [
      "Aluminum (aluminum hydroxide adjuvant, 0.5 mg aluminum)",
      "Formaldehyde (residual, <=100 mcg)",
      "Glutaraldehyde (residual)",
      "Polysorbate 80 (Tween 80, <=100 mcg)",
      "Bovine extract / bovine casein (cow's milk casein-derived; theoretical milk-protein relevance)"
    ],
    "sourceUrl": "https://www.vaccinesafety.edu/components-excipients/ (Institute for Vaccine Safety, Johns Hopkins; data PDF https://www.vaccinesafety.edu/wp-content/uploads/2025/04/Components-Excipients-25-0407-by-Excipient.pdf)"
  },
  {
    "id": "pediarix",
    "name": "Diphtheria and Tetanus Toxoids and Acellular Pertussis Adsorbed, Hepatitis B (Recombinant) and Inactivated Poliovirus Vaccine (DTaP-HepB-IPV)",
    "brand": "Pediarix",
    "manufacturer": "GlaxoSmithKline (GSK) Biologicals",
    "type": "DTaP combination (DTaP-Hepatitis B-Inactivated Polio); inactivated toxoid/subunit + recombinant HBsAg + inactivated poliovirus; aluminum-adjuvanted; preservative-free; licensed/in use",
    "ingredients": [
      "Diphtheria toxoid (25 Lf)",
      "Tetanus toxoid (10 Lf)",
      "Inactivated pertussis toxin (PT) 25 mcg",
      "Filamentous hemagglutinin (FHA) 25 mcg",
      "Pertactin (69 kiloDalton outer membrane protein / PRN) 8 mcg",
      "Hepatitis B surface antigen (HBsAg) 10 mcg (recombinant, from Saccharomyces cerevisiae / yeast)",
      "Inactivated poliovirus Type 1 (Mahoney) 40 D-antigen Units",
      "Inactivated poliovirus Type 2 (MEF-1) 8 D-antigen Units",
      "Inactivated poliovirus Type 3 (Saukett) 32 D-antigen Units",
      "Aluminum hydroxide and aluminum phosphate (adjuvants) (aluminum <=0.7 mg total)",
      "Sodium chloride (salts, mineral; 4.4 mg, to adjust tonicity)",
      "Residual formaldehyde (<=100 mcg)",
      "Glutaraldehyde (inactivating agent used to detoxify PT; residual amount not specified in package insert)",
      "Polysorbate 80 (Tween 80) (<=100 mcg)",
      "Neomycin (neomycin sulfate) (<=0.05 ng per dose)",
      "Polymyxin B (polymyxin B sulfate) (<=0.01 ng per dose)",
      "Yeast protein (<=5%)",
      "Bovine extract (Fenton medium for diphtheria; medium nutrient/stabilizer)",
      "Bovine casein (modified Latham medium for tetanus; medium nutrient)",
      "Bovine serum albumin / Albumin, Bovine Serum (from VERO cell culture growth)",
      "Lactalbumin hydrolysate (poliovirus growth medium ingredient)",
      "VERO cells (monkey kidney cell line; poliovirus culture)",
      "Modified Stainer-Scholte liquid medium (pertussis culture)"
    ],
    "confirmedAllergens": [
      "yeast (Saccharomyces cerevisiae / yeast protein, <=5%)",
      "polysorbate 80 (Tween 80)",
      "neomycin",
      "polymyxin B",
      "aluminum (aluminum hydroxide and aluminum phosphate, <=0.7 mg)",
      "formaldehyde (residual, <=100 mcg)",
      "bovine/beef-derived proteins (bovine extract, bovine casein, bovine serum albumin)",
      "latex (RELEVANT AS ABSENCE: syringe tip cap and plunger NOT made with natural rubber latex)"
    ],
    "sourceUrl": "https://www.cdc.gov/vaccines/pubs/pinkbook/downloads/appendices/b/excipient-table-2.pdf"
  },
  {
    "id": "havrix",
    "name": "Hepatitis A vaccine, inactivated (HepA)",
    "brand": "Havrix",
    "manufacturer": "GlaxoSmithKline (GSK)",
    "type": "Inactivated (killed) hepatitis A virus vaccine; aluminum-adjuvanted",
    "ingredients": [
      "MRC-5 cellular proteins (residual, not more than 5 mcg/mL)",
      "formalin (not more than 0.1 mg/mL)",
      "aluminum hydroxide (adjuvant; 0.25 mg aluminum per 0.5 mL pediatric dose / 0.5 mg per 1 mL adult dose)",
      "amino acid supplement (0.3% w/v)",
      "phosphate-buffered saline solution",
      "polysorbate 20 (0.05 mg/mL)",
      "neomycin sulfate (residual aminoglycoside antibiotic, not more than 40 ng/mL)"
    ],
    "confirmedAllergens": [
      "aluminum",
      "formaldehyde",
      "neomycin",
      "polysorbate 20"
    ],
    "sourceUrl": "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Havrix/pdf/HAVRIX.PDF"
  },
  {
    "id": "vaqta",
    "name": "Hepatitis A vaccine, inactivated (HepA)",
    "brand": "Vaqta",
    "manufacturer": "Merck & Co., Inc.",
    "type": "Inactivated (killed) hepatitis A virus vaccine; aluminum-adjuvanted",
    "ingredients": [
      "amorphous aluminum hydroxyphosphate sulfate",
      "non-viral protein",
      "DNA",
      "bovine albumin",
      "formaldehyde",
      "neomycin",
      "sodium borate",
      "sodium chloride",
      "MRC-5 cellular protein/DNA residuals",
      "other process chemical residuals"
    ],
    "confirmedAllergens": [
      "aluminum (as amorphous aluminum hydroxyphosphate sulfate, adjuvant ~450 mcg adult / 225 mcg pediatric)",
      "neomycin (trace, <10 ppb)",
      "formaldehyde (residual <0.8 mcg/dose)",
      "bovine albumin (residual, bovine-derived <1e-4 mcg/dose)",
      "latex / natural rubber (in vial stopper, syringe plunger stopper, and tip cap)"
    ],
    "sourceUrl": "https://www.fffenterprises.com/assets/downloads/product-information/merck/pi-VAQTA.pdf"
  },
  {
    "id": "engerix-b",
    "name": "Hepatitis B vaccine, recombinant (HepB)",
    "brand": "Engerix-B",
    "manufacturer": "GlaxoSmithKline (GSK)",
    "type": "Recombinant hepatitis B surface antigen (HBsAg) vaccine, yeast-derived; aluminum-adjuvanted",
    "ingredients": [
      "aluminum hydroxide",
      "yeast protein",
      "sodium chloride",
      "disodium phosphate dihydrate",
      "sodium dihydrogen phosphate dihydrate"
    ],
    "confirmedAllergens": [
      "aluminum",
      "yeast",
      "latex"
    ],
    "sourceUrl": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4d930f24-4ddb-488d-9e79-3f495972733b"
  },
  {
    "id": "recombivax-hb",
    "name": "Hepatitis B vaccine, recombinant (HepB)",
    "brand": "Recombivax HB",
    "manufacturer": "Merck & Co., Inc.",
    "type": "Recombinant hepatitis B surface antigen (HBsAg) vaccine, yeast-derived; aluminum-adjuvanted",
    "ingredients": [
      "formaldehyde (<15 mcg/mL, residual)",
      "potassium aluminum sulfate (alum)",
      "amorphous aluminum hydroxyphosphate sulfate (~0.5 mg aluminum/mL adjuvant)",
      "yeast protein (<1%, from Saccharomyces cerevisiae)",
      "soy peptone (fermentation medium)",
      "dextrose (fermentation medium)",
      "amino acids (fermentation medium)",
      "mineral salts (fermentation medium / tonicity)"
    ],
    "confirmedAllergens": [
      "yeast",
      "aluminum",
      "formaldehyde",
      "soy",
      "latex"
    ],
    "sourceUrl": "https://www.vaccinesafety.edu/wp-content/uploads/2024/10/Components-Excipients-by-Excipient-24-1014.pdf"
  },
  {
    "id": "twinrix",
    "name": "Hepatitis A and Hepatitis B combination vaccine (HepA-HepB)",
    "brand": "Twinrix",
    "manufacturer": "GlaxoSmithKline (GSK)",
    "type": "Combination vaccine: inactivated hepatitis A virus plus recombinant hepatitis B surface antigen; aluminum-adjuvanted",
    "ingredients": [
      "inactivated hepatitis A virus (strain HM175)",
      "recombinant hepatitis B surface antigen (HBsAg)",
      "MRC-5 cellular proteins",
      "formalin",
      "aluminum phosphate",
      "aluminum hydroxide",
      "amino acids",
      "sodium chloride",
      "phosphate buffer",
      "polysorbate 20",
      "neomycin sulfate",
      "yeast protein (Saccharomyces cerevisiae)",
      "Water for Injection"
    ],
    "confirmedAllergens": [
      "aluminum (aluminum phosphate and aluminum hydroxide)",
      "formaldehyde/formalin",
      "neomycin sulfate (aminoglycoside antibiotic)",
      "yeast protein (Saccharomyces cerevisiae)",
      "polysorbate 20"
    ],
    "sourceUrl": "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Twinrix/pdf/TWINRIX.PDF"
  },
  {
    "id": "heplisav-b",
    "name": "Hepatitis B vaccine, recombinant, adjuvanted with CpG 1018 (HepB-CpG)",
    "brand": "Heplisav-B",
    "manufacturer": "Dynavax Technologies",
    "type": "Recombinant hepatitis B surface antigen (HBsAg) vaccine, yeast-derived; CpG 1018 (oligodeoxynucleotide) adjuvanted; NOT aluminum-adjuvanted, preservative-free",
    "ingredients": [
      "hepatitis B surface antigen (HBsAg), recombinant, expressed in Hansenula polymorpha yeast",
      "CpG 1018 adjuvant (a 22-mer phosphorothioate linked oligodeoxynucleotide)",
      "sodium chloride",
      "sodium phosphate, dibasic dodecahydrate",
      "sodium phosphate, monobasic dihydrate",
      "polysorbate 80",
      "residual yeast protein",
      "residual yeast DNA",
      "residual deoxycholate"
    ],
    "confirmedAllergens": [
      "yeast",
      "polysorbate 80",
      "deoxycholate"
    ],
    "sourceUrl": "https://www.dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=618db7b8-a5e4-49c8-9390-38912e6f39fd&type=display"
  },
  {
    "id": "gardasil-9",
    "name": "Human Papillomavirus 9-valent Vaccine, Recombinant (HPV9)",
    "brand": "Gardasil 9",
    "manufacturer": "Merck Sharp & Dohme Corp., a subsidiary of Merck & Co., Inc.",
    "type": "HPV (human papillomavirus) recombinant 9-valent vaccine; virus-like particle (VLP), aluminum-adjuvanted; suspension for intramuscular injection. Currently FDA-approved and in use.",
    "ingredients": [
      "HPV Type 6, 11, 16, 18, 31, 33, 45, 52, and 58 L1 proteins (purified virus-like particles / VLPs of the major capsid L1 protein) — approximately 30 mcg (Type 6), 40 mcg (Type 11), 60 mcg (Type 16), 40 mcg (Type 18), 20 mcg (Type 31), 20 mcg (Type 33), 20 mcg (Type 45), 20 mcg (Type 52), 20 mcg (Type 58)",
      "Approximately 500 mcg of aluminum (provided as Amorphous Aluminum Hydroxyphosphate Sulfate / AAHS adjuvant)",
      "9.56 mg of sodium chloride",
      "0.78 mg of L-histidine",
      "50 mcg of polysorbate 80",
      "35 mcg of sodium borate",
      "<7 mcg yeast protein (L1 proteins produced by separate fermentations using recombinant Saccharomyces cerevisiae)",
      "Water for injection",
      "Fermentation media components (chemically-defined; used in manufacturing): vitamins, amino acids, mineral salts, and carbohydrates"
    ],
    "confirmedAllergens": [
      "aluminum (as Amorphous Aluminum Hydroxyphosphate Sulfate / AAHS)",
      "polysorbate 80",
      "yeast (Saccharomyces cerevisiae; <7 mcg residual yeast protein)",
      "sodium borate"
    ],
    "sourceUrl": "https://www.merck.com/product/usa/pi_circulars/g/gardasil_9/gardasil_9_pi.pdf"
  },
  {
    "id": "prevnar-20",
    "name": "Pneumococcal 20-valent Conjugate Vaccine (Diphtheria CRM197 Protein) (PCV20)",
    "brand": "Prevnar 20",
    "manufacturer": "Pfizer Inc. (Wyeth Pharmaceuticals LLC, a subsidiary of Pfizer Inc.)",
    "type": "Pneumococcal conjugate vaccine (PCV20); polysaccharide-protein conjugate, aluminum-adjuvanted; suspension for intramuscular injection. Currently FDA-approved and in use.",
    "ingredients": [
      "Saccharides of the capsular antigens of S. pneumoniae serotypes 1, 3, 4, 5, 6A, 6B, 7F, 8, 9V, 10A, 11A, 12F, 14, 15B, 18C, 19A, 19F, 22F, 23F, and 33F, individually conjugated to non-toxic diphtheria CRM197 protein — approximately 2.2 mcg of each serotype saccharide and 4.4 mcg of serotype 6B saccharide per 0.5 mL dose",
      "51 mcg CRM197 carrier protein (a non-toxic variant of diphtheria toxin isolated from cultures of Corynebacterium diphtheriae strain C7 (β197) grown in a casamino acids and yeast extract-based medium or in a chemically-defined medium)",
      "100 mcg polysorbate 80",
      "295 mcg succinate buffer",
      "4.4 mg sodium chloride",
      "125 mcg aluminum as aluminum phosphate adjuvant",
      "Soy peptone broth (growth medium in which each pneumococcal serotype is grown; a manufacturing/process component)",
      "No preservative (no thimerosal); no antibiotics, formaldehyde, gelatin, egg/ovalbumin, PEG, or lactose are listed"
    ],
    "confirmedAllergens": [
      "polysorbate 80",
      "aluminum (as aluminum phosphate adjuvant)",
      "soy (soy peptone broth growth medium; residual only, removed during purification)",
      "yeast (yeast extract-based medium used to grow CRM197; residual only)",
      "diphtheria CRM197 protein (relevant for diphtheria-toxoid hypersensitivity; contraindicated if severe allergy to diphtheria toxoid)"
    ],
    "sourceUrl": "https://labeling.pfizer.com/ShowLabeling.aspx?id=15428"
  },
  {
    "id": "pneumovax-23",
    "name": "Pneumococcal Vaccine Polyvalent (Pneumococcal Polysaccharide Vaccine, PPSV23)",
    "brand": "Pneumovax 23",
    "manufacturer": "Merck Sharp & Dohme Corp., a subsidiary of Merck & Co., Inc.",
    "type": "Pneumococcal polysaccharide vaccine (PPSV23); non-conjugated purified capsular polysaccharide vaccine; sterile liquid for intramuscular or subcutaneous injection; contains the preservative phenol. Currently FDA-approved and in use.",
    "ingredients": [
      "Purified capsular polysaccharides from 23 pneumococcal serotypes (1, 2, 3, 4, 5, 6B, 7F, 8, 9N, 9V, 10A, 11A, 12F, 14, 15B, 17F, 18C, 19F, 19A, 20, 22F, 23F, and 33F) — 25 micrograms of each polysaccharide type per 0.5 mL dose",
      "Isotonic saline solution",
      "0.25% phenol as a preservative",
      "Water for injection"
    ],
    "confirmedAllergens": [
      "phenol (preservative)"
    ],
    "sourceUrl": "https://www.fda.gov/files/vaccines,%20blood%20&%20biologics/published/Package-Insert-PNEUMOVAX-23_0.pdf"
  },
  {
    "id": "vaxneuvance",
    "name": "Pneumococcal 15-valent Conjugate Vaccine (CRM197 Protein), Adsorbed (PCV15)",
    "brand": "Vaxneuvance",
    "manufacturer": "Merck Sharp & Dohme LLC, a subsidiary of Merck & Co., Inc.",
    "type": "Pneumococcal conjugate vaccine (PCV15); polysaccharide-CRM197 protein conjugate, aluminum-adsorbed; suspension for intramuscular injection; no preservative. Currently FDA-approved and in use.",
    "ingredients": [
      "Pneumococcal polysaccharides from serotypes 1, 3, 4, 5, 6A, 6B, 7F, 9V, 14, 18C, 19A, 19F, 22F, 23F, and 33F, each conjugated to CRM197 carrier protein — 2.0 mcg of polysaccharide from each of 14 serotypes and 4.0 mcg of polysaccharide from serotype 6B per 0.5 mL dose",
      "30 mcg of CRM197 carrier protein (a non-toxic variant of diphtheria toxin originating from Corynebacterium diphtheriae)",
      "1.55 mg L-histidine",
      "1 mg polysorbate 20",
      "4.50 mg sodium chloride",
      "125 mcg of aluminum as aluminum phosphate adjuvant",
      "Yeast extract (growth-media nutrient; pneumococcal serotypes grown in media containing yeast extract, dextrose, salts and soy peptone) — amount not specified",
      "Dextrose (growth-media nutrient) — amount not specified",
      "Soy peptone (growth-media nutrient) — amount not specified",
      "Salts (mineral, growth medium)"
    ],
    "confirmedAllergens": [
      "soy (soy peptone — growth-medium component, residual)",
      "yeast (yeast extract — growth-medium component, residual)",
      "aluminum (125 mcg as aluminum phosphate adjuvant)",
      "polysorbate 20 (1 mg; note: polysorbate 20, NOT polysorbate 80)"
    ],
    "sourceUrl": "https://www.merck.com/product/usa/pi_circulars/v/vaxneuvance/vaxneuvance_pi.pdf"
  },
  {
    "id": "menveo",
    "name": "Meningococcal (Groups A, C, Y and W-135) Oligosaccharide Diphtheria CRM197 Conjugate Vaccine (MenACWY)",
    "brand": "Menveo",
    "manufacturer": "GSK (GlaxoSmithKline; originally Novartis)",
    "type": "Quadrivalent meningococcal ACWY conjugate vaccine (inactivated; no preservative or adjuvant)",
    "ingredients": [
      "CRM197 protein (Corynebacterium diphtheriae carrier protein)",
      "formaldehyde (residual; not more than 0.30 mcg per dose)",
      "yeast extract (residual, from CY fermentation medium for CRM197)",
      "amino acids (residual, from CY fermentation medium for CRM197)",
      "potassium dihydrogen phosphate (in lyophilized MenA powder)",
      "sucrose (in lyophilized MenA powder)",
      "sodium chloride (in MenCYW-135 liquid component)",
      "sodium dihydrogen phosphate monohydrate (in liquid component)",
      "disodium hydrogen phosphate dihydrate (in liquid component)",
      "water for injection"
    ],
    "confirmedAllergens": [
      "formaldehyde (residual, not more than 0.30 mcg/dose)",
      "diphtheria toxoid protein (CRM197) — relevant for diphtheria-protein hypersensitivity",
      "yeast extract (residual fermentation medium component)"
    ],
    "sourceUrl": "https://www.fda.gov/media/78514/download"
  },
  {
    "id": "menquadfi",
    "name": "Meningococcal (Groups A, C, Y, W) Conjugate Vaccine (MenACWY-TT)",
    "brand": "MenQuadfi",
    "manufacturer": "Sanofi Pasteur",
    "type": "Quadrivalent meningococcal ACWY tetanus-toxoid conjugate vaccine (inactivated; no adjuvant, no preservative)",
    "ingredients": [
      "meningococcal polysaccharide antigens A, C, W, Y (10 mcg each)",
      "tetanus toxoid protein carrier (approximately 55 mcg)",
      "sodium chloride (3.35 mg / 0.67%)",
      "sodium acetate (1.23 mg / 30 mM)",
      "formaldehyde (residual; less than 3 mcg/mL by calculation)",
      "ammonium sulfate (residual from tetanus protein purification by precipitation)",
      "water for injection"
    ],
    "confirmedAllergens": [
      "formaldehyde (residual, <3 mcg/mL)"
    ],
    "sourceUrl": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ab1c3318-578e-4d0c-a21e-fc6df07e9fb7"
  },
  {
    "id": "bexsero",
    "name": "Meningococcal Group B Vaccine (MenB-4C; recombinant proteins plus outer membrane vesicles)",
    "brand": "Bexsero",
    "manufacturer": "GSK (GlaxoSmithKline; originally Novartis)",
    "type": "Serogroup B meningococcal vaccine (recombinant, OMV; aluminum-adjuvanted)",
    "ingredients": [
      "recombinant Neisserial adhesin A (NadA) - 50 mcg",
      "recombinant Neisserial Heparin Binding Antigen (NHBA) - 50 mcg",
      "recombinant factor H binding protein (fHbp) - 50 mcg",
      "Outer Membrane Vesicles (OMV) - 25 mcg",
      "aluminum hydroxide - 1.5 mg (0.519 mg of Al3+) [adjuvant]",
      "sodium chloride - 3.125 mg",
      "histidine - 0.776 mg",
      "sucrose - 10 mg",
      "kanamycin - residual, less than 0.01 mcg by calculation",
      "deoxycholate (sodium deoxycholate) - used to inactivate bacteria and form OMV; residual"
    ],
    "confirmedAllergens": [
      "aluminum (aluminum hydroxide adjuvant, 0.519 mg Al3+)",
      "kanamycin (residual antibiotic, <0.01 mcg; safe use in kanamycin-sensitive individuals not established)",
      "deoxycholate (residual, used in OMV manufacture)"
    ],
    "sourceUrl": "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Bexsero/pdf/BEXSERO.PDF"
  },
  {
    "id": "trumenba",
    "name": "Meningococcal Group B Vaccine (MenB-FHbp; recombinant factor H binding protein, two variants)",
    "brand": "Trumenba",
    "manufacturer": "Pfizer (Wyeth Pharmaceuticals LLC)",
    "type": "Serogroup B meningococcal vaccine (recombinant; aluminum-adjuvanted)",
    "ingredients": [
      "Recombinant lipidated factor H binding protein (fHbp), subfamily A variant (A05) - 60 micrograms - active ingredient",
      "Recombinant lipidated factor H binding protein (fHbp), subfamily B variant (B01) - 60 micrograms - active ingredient (total 120 mcg protein per 0.5 mL dose)",
      "aluminum phosphate (AlPO4; 0.25 mg of aluminum/Al3+ per dose) - adjuvant",
      "polysorbate 80 (PS80; 0.018 mg)",
      "histidine (10 mM histidine buffered saline, pH 6.0)",
      "sodium chloride (saline component)",
      "water for injection",
      "residual components from E. coli production/purification (recombinant proteins produced in E. coli)"
    ],
    "confirmedAllergens": [
      "polysorbate 80",
      "aluminum (aluminum phosphate)"
    ],
    "sourceUrl": "https://fda.report/media/89936/Package-Insert---TRUMENBA.pdf"
  },
  {
    "id": "ipol",
    "name": "Poliovirus Vaccine Inactivated (IPV; types 1, 2, 3; grown in Vero cells)",
    "brand": "IPOL",
    "manufacturer": "Sanofi Pasteur",
    "type": "Inactivated poliovirus vaccine (IPV; trivalent)",
    "ingredients": [
      "Vero cells (continuous line of monkey kidney cells cultivated on microcarriers) - cell substrate",
      "calf bovine serum albumin (residual; less than 50 ng/dose)",
      "2-phenoxyethanol (0.5%) - preservative",
      "formaldehyde (maximum 0.02% per dose) - inactivating agent/preservative",
      "neomycin (less than 5 ng/dose) - residual antibiotic",
      "streptomycin (200 ng/dose) - residual antibiotic",
      "polymyxin B (25 ng/dose) - residual antibiotic",
      "M-199 medium (Medium 199 / Hanks' Balanced Salt Solution) - diluent"
    ],
    "confirmedAllergens": [
      "neomycin",
      "streptomycin",
      "polymyxin B",
      "formaldehyde",
      "2-phenoxyethanol",
      "calf bovine serum albumin (bovine-derived residual)"
    ],
    "sourceUrl": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=34a647f5-8728-451b-b918-94c8acd15974"
  },
  {
    "id": "acthib",
    "name": "Haemophilus b Conjugate Vaccine (Tetanus Toxoid Conjugate; PRP-T)",
    "brand": "ActHIB",
    "manufacturer": "Sanofi Pasteur",
    "type": "Haemophilus influenzae type b (Hib) conjugate vaccine (lyophilized; reconstituted with saline diluent; no adjuvant, no preservative)",
    "ingredients": [
      "sucrose (8.5%) - stabilizer",
      "formaldehyde (residual; <0.5 mcg per dose by calculation) - residual from formalin inactivation of tetanus toxoid",
      "sodium chloride (0.4% in saline diluent) - tonicity/diluent",
      "ammonium sulfate (residual from ammonium sulfate purification of tetanus toxoid)",
      "milk-derived raw materials (casein derivatives) - culture medium nutrient for tetanus toxoid; per FDA package insert",
      "Haemophilus influenzae type b capsular polysaccharide (polyribosyl-ribitol-phosphate, PRP), 10 mcg - active",
      "inactivated tetanus toxoid (PRP-T conjugate carrier protein), 24 mcg - active",
      "no preservative (no thimerosal); no adjuvant (no aluminum)",
      "semi-synthetic medium (Hib growth medium)"
    ],
    "confirmedAllergens": [
      "formaldehyde (residual, <0.5 mcg/dose)",
      "milk/casein derivatives (residual, from tetanus toxoid culture medium)"
    ],
    "sourceUrl": "https://www.fda.gov/media/74395/download"
  },
  {
    "id": "pedvaxhib-liquid-pedvaxhib",
    "name": "Haemophilus b Conjugate Vaccine (Meningococcal Protein Conjugate; PRP-OMP)",
    "brand": "PedvaxHIB (Liquid PedvaxHIB)",
    "manufacturer": "Merck (Merck Sharp & Dohme)",
    "type": "Haemophilus influenzae type b (Hib) conjugate vaccine (aluminum-adjuvanted liquid; no thimerosal, no lactose)",
    "ingredients": [
      "amorphous aluminum hydroxyphosphate sulfate (225 mcg of aluminum per dose; previously referred to as aluminum hydroxide) - adjuvant",
      "sodium chloride (0.9%)",
      "amino acid (medium nutrient; amount not specified in package insert) - manufacturing-process growth-medium component",
      "phenol (used as an ingredient in purification) - residual from manufacturing"
    ],
    "confirmedAllergens": [
      "aluminum (225 mcg per dose, as amorphous aluminum hydroxyphosphate sulfate)",
      "phenol (residual purification agent; not a classic allergen but a notable chemical component)"
    ],
    "sourceUrl": "https://www.vaccinesafety.edu/components-excipients/"
  },
  {
    "id": "rotateq",
    "name": "Rotavirus vaccine, live, oral, pentavalent (RV5)",
    "brand": "RotaTeq",
    "manufacturer": "Merck & Co., Inc.",
    "type": "Live attenuated oral rotavirus vaccine (5 live reassortant human-bovine rotaviruses); currently FDA-approved and in use",
    "ingredients": [
      "Live reassortant rotaviruses (G1, G2, G3, G4, and P1A[8]; reassortants of human and bovine parent strains, bovine outer-surface protein G6/P7[5])",
      "Sucrose",
      "Sodium citrate",
      "Sodium phosphate monobasic monohydrate",
      "Sodium hydroxide",
      "Polysorbate 80",
      "Cell culture media",
      "Fetal bovine serum (trace amounts)",
      "Vero cells (propagation substrate; reassortants propagated in Vero cells, in the absence of antifungal agents)",
      "No preservatives; no thimerosal"
    ],
    "confirmedAllergens": [
      "polysorbate 80",
      "fetal bovine serum (bovine / cattle-derived, trace)"
    ],
    "sourceUrl": "https://www.merck.com/product/usa/pi_circulars/r/rotateq/rotateq_pi.pdf"
  },
  {
    "id": "rotarix",
    "name": "Rotavirus vaccine, live, oral (RV1), human strain RIX4414 G1P[8]",
    "brand": "Rotarix",
    "manufacturer": "GlaxoSmithKline Biologicals (GSK)",
    "type": "Live attenuated oral rotavirus vaccine (monovalent human strain); currently FDA-approved and in use",
    "ingredients": [
      "Live, attenuated human rotavirus, derived from the human 89-12 strain (RIX4414), G1P[8] type, propagated on Vero cells",
      "Amino acids",
      "Dextran",
      "Sorbitol",
      "Sucrose",
      "Dulbecco's Modified Eagle Medium (DMEM)",
      "DMEM components: sodium chloride, potassium chloride, magnesium sulfate, ferric (III) nitrate, sodium dihydrogen phosphate, sodium pyruvate, D-glucose, concentrated vitamin solution, L-cystine, L-tyrosine, amino acids solution, L-glutamine, calcium chloride, and sodium hydrogenocarbonate",
      "Liquid diluent (vial/applicator presentation): calcium carbonate, sterile water, and xanthan",
      "Porcine circovirus type 1 (PCV-1) is present; porcine-derived materials are used in manufacturing (PCV-1 is not known to cause disease in humans)",
      "Oral dosing applicator only (liquid) presentation differs: contains disodium adipate (antacid) instead of calcium carbonate/dextran/sorbitol; also DMEM, sucrose, and sterile water"
    ],
    "confirmedAllergens": [
      "latex (natural rubber latex in oral dosing applicator tip caps)",
      "porcine circovirus type 1 (PCV-1) / porcine-derived materials"
    ],
    "sourceUrl": "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Rotarix/pdf/ROTARIX-PI-PIL.PDF"
  },
  {
    "id": "arexvy",
    "name": "Respiratory Syncytial Virus Vaccine, Adjuvanted (RSVPreF3, recombinant subunit)",
    "brand": "Arexvy",
    "manufacturer": "GlaxoSmithKline Biologicals (GSK)",
    "type": "Recombinant prefusion F protein subunit vaccine with AS01E adjuvant; currently FDA-approved and in use",
    "ingredients": [
      "Recombinant RSVPreF3 antigen 120 mcg (RSV prefusion F glycoprotein, stabilized prefusion conformation)",
      "AS01E adjuvant (liposomal)",
      "MPL (3-O-desacyl-4'-monophosphoryl lipid A from Salmonella minnesota) 25 mcg",
      "QS-21 (saponin purified from Quillaja saponaria Molina extract) 25 mcg",
      "DOPC (dioleoyl phosphatidylcholine) 0.5 mg",
      "Cholesterol 0.125 mg",
      "Trehalose 14.7 mg",
      "Polysorbate 80 0.18 mg",
      "Sodium chloride 4.4 mg",
      "Potassium dihydrogen phosphate 0.83 mg",
      "Dipotassium phosphate 0.26 mg",
      "Disodium phosphate anhydrous 0.15 mg",
      "Residual host cell proteins (≤2.0%)",
      "Residual DNA (≤0.80 ng/mg)",
      "Water for injection",
      "No preservative",
      "Antigen produced in Chinese Hamster Ovary (CHO) cells"
    ],
    "confirmedAllergens": [
      "polysorbate 80"
    ],
    "sourceUrl": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1e50f275-002e-413f-a840-66ee3cb3740c"
  },
  {
    "id": "abrysvo",
    "name": "Respiratory Syncytial Virus Vaccine (RSVpreF, bivalent recombinant subunit, unadjuvanted)",
    "brand": "Abrysvo",
    "manufacturer": "Pfizer Inc.",
    "type": "Recombinant bivalent prefusion F protein subunit vaccine (no adjuvant); currently FDA-approved and in use (adults and maternal)",
    "ingredients": [
      "RSV stabilized prefusion F proteins 120 mcg (60 mcg RSV preF A + 60 mcg RSV preF B)",
      "Tromethamine (Tris) 0.11 mg",
      "Tromethamine hydrochloride 1.04 mg",
      "Sucrose 11.3 mg",
      "Mannitol 22.5 mg",
      "Polysorbate 80 0.08 mg",
      "Sodium chloride 1.1 mg",
      "Sterile water (diluent for reconstitution of the lyophilized antigen)",
      "Residual host cell proteins (≤0.1% w/w)",
      "Residual DNA (<0.4 ng/mg of total protein)",
      "No preservative; no adjuvant"
    ],
    "confirmedAllergens": [
      "Polysorbate 80"
    ],
    "sourceUrl": "https://www.vaccinesafety.edu/wp-content/uploads/2024/10/Components-Excipients-by-Vaccine-Name-24-1014.pdf"
  },
  {
    "id": "mresvia",
    "name": "Respiratory Syncytial Virus Vaccine (mRNA), mRNA-1345",
    "brand": "mRESVIA",
    "manufacturer": "Moderna US, Inc. (ModernaTX)",
    "type": "Nucleoside-modified mRNA vaccine in lipid nanoparticles (no adjuvant); currently FDA-approved and in use. Note: not yet listed in the Oct-2024 Johns Hopkins IVS table, so ingredients verified directly from the FDA package insert",
    "ingredients": [
      "Nucleoside-modified mRNA encoding the RSV subtype A F glycoprotein stabilized in the prefusion conformation (pre-F protein) - 50 mcg",
      "Total lipid content 1.02 mg, consisting of:",
      "SM-102 (heptadecan-9-yl 8-((2-hydroxyethyl)(6-oxo-6-(undecyloxy)hexyl)amino)octanoate)",
      "PEG2000-DMG (polyethylene glycol 2000 dimyristoyl glycerol) - contains polyethylene glycol (PEG)",
      "Cholesterol",
      "DSPC (1,2-distearoyl-sn-glycero-3-phosphocholine)",
      "Tromethamine 0.25 mg",
      "Tromethamine hydrochloride 1.2 mg",
      "Acetic acid 0.021 mg",
      "Sodium acetate trihydrate 0.10 mg",
      "Sucrose 44 mg",
      "Water for injection",
      "No preservative; no adjuvant"
    ],
    "confirmedAllergens": [
      "PEG / polyethylene glycol (as PEG2000-DMG lipid)"
    ],
    "sourceUrl": "https://www.fda.gov/vaccines-blood-biologics/vaccines/mresvia"
  }
];

export const VACCINE_PICK_IDS: string[] = ["comirnaty","spikevax","fluzone-quadrivalent","fluarix-quadrivalent","m-m-r-ii","varivax","shingrix","gardasil-9"];

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** Resolve a typed query to a known vaccine by brand / name / common alias. */
export function findVaccineByName(q: string): Vaccine | undefined {
  const t = norm(q);
  if (t.length < 3) return undefined;
  for (const v of VACCINES) {
    if (norm(v.brand) === t || norm(v.name) === t) return v;
  }
  for (const v of VACCINES) {
    const nb = norm(v.brand);
    if (nb.includes(t) || t.includes(nb)) return v;
  }
  return undefined;
}

export const VACCINE_BRANDS: string[] = VACCINES.map((v) => v.brand);
export const VACCINE_PICKS: Vaccine[] = VACCINE_PICK_IDS.map(
  (id) => VACCINES.find((v) => v.id === id)!,
).filter(Boolean);
