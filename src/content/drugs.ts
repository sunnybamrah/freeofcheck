// Bundled drug names for instant autocomplete + a curated "popular medicines"
// quick-pick. DRUG_NAMES is sourced from openFDA's most-common label names (the
// authoritative drug list) so suggestions are real and instant (no network wait).
// 593 names.

export interface PopularDrug { name: string; hint: string }

export const POPULAR_DRUGS: PopularDrug[] = [
  {
    "name": "Acetaminophen",
    "hint": "Tylenol"
  },
  {
    "name": "Ibuprofen",
    "hint": "Advil"
  },
  {
    "name": "Aspirin",
    "hint": ""
  },
  {
    "name": "Naproxen",
    "hint": "Aleve"
  },
  {
    "name": "Diphenhydramine",
    "hint": "Benadryl"
  },
  {
    "name": "Loratadine",
    "hint": "Claritin"
  },
  {
    "name": "Cetirizine",
    "hint": "Zyrtec"
  },
  {
    "name": "Fexofenadine",
    "hint": "Allegra"
  },
  {
    "name": "Famotidine",
    "hint": "Pepcid"
  },
  {
    "name": "Omeprazole",
    "hint": "Prilosec"
  },
  {
    "name": "Loperamide",
    "hint": "Imodium"
  },
  {
    "name": "Guaifenesin",
    "hint": "Mucinex"
  },
  {
    "name": "Dextromethorphan",
    "hint": "Robitussin"
  },
  {
    "name": "Melatonin",
    "hint": ""
  },
  {
    "name": "Hydrocortisone",
    "hint": ""
  },
  {
    "name": "Calcium carbonate",
    "hint": "Tums"
  }
];

export const DRUG_NAMES: string[] = ["Abies Nigra","Abiraterone Acetate","Abrotanum","Absinthium","Acetaminophen","Acetaminophen And Codeine Phosphate","Acetaminophen And Ibuprofen","Acetaminophen Extra Strength","Acetaminophen, Aspirin And Caffeine","Acetaminophen, Aspirin, Caffeine","Acetaminophen, Dextromethorphan Hbr","Acetaminophen, Diphenhydramine HCl","Acetaminophen, Ibuprofen","Acetazolamide","Acid Reducer","Aconitum Napellus","Acyclovir","Adapalene","Adenosine","Aethusa Cynapium","Agaricus Muscarius","Agnus Castus","Air","Albuterol Sulfate","Alcohol","Alcohol Antiseptic","Alcohol Prep Pads","Allantoin","Allergy Relief","Allopurinol","Alprazolam","Aluminum Chlorohydrate","Aluminum Sesquichlorohydrate","Aluminum Zirconium Octachlorohydrex Gly","Aluminum Zirconium Tetrachlorohydrex Gly","Aluminum Zirconium Trichlorohydrex Gly","Amantadine Hydrochloride","Aminocaproic Acid","Amiodarone Hydrochloride","Amitriptyline Hydrochloride","Amlodipine Besylate","Amoxicillin","Amoxicillin And Clavulanate Potassium","Ampicillin","Ampicillin Sodium","Anastrozole","Antacid Tablets","Anti-Diarrheal","Anticavity","Antiseptic","Antiseptic Mouth Rinse","Antispetic","Aripiprazole","Arnica Montana","Arsenic Trioxide","Aspirin","Aspirin Low Dose","Aspirin, Citric Acid, Sodium Bicarbonate","Atenolol","Atomoxetine","Atorvastatin Calcium","Atovaquone","Atropine Sulfate","Avobenzone, Homosalate, Octisalate","Avobenzone, Homosalate, Octocrylene","Avobenzone, Octisalate, Octocrylene","Axe","Azacitidine","Azithromycin","Azithromycin Dihydrate","Bach Original Flower Remedies","Bacitracin","Bacitracin Zinc","Baclofen","Banana Boat","Benazepril Hydrochloride","Benzalkonium Chloride","Benzalkonium Chloride 0.13%","Benzethonium Chloride","Benzocaine","Benzonatate","Benzoyl Peroxide","Benztropine Mesylate","Betamethasone Dipropionate","Bisacodyl","Bismuth Subsalicylate","Bisoprolol Fumarate","Bortezomib","Brightening Skin Tint","Budesonide","Buildable Blur","Bumetanide","Bupivacaine Hydrochloride","Buprenorphine","Buprenorphine And Naloxone","Bupropion Hydrochloride","Bupropion Hydrochloride (Xl)","Bupropion Hydrochloride Sr","Bupropion Hydrochloride Xl","Buspirone Hydrochloride","Butalbital, Acetaminophen And Caffeine","Butalbital, Acetaminophen, And Caffeine","Butenafine Hydrochloride","Caffeine","Calamine","Calcitriol","Calcium Acetate","Calcium Carbonate","Calcium Gluconate","Calcium Polycarbophil","Camphor","Camphor, Eucalyptus Oil, Menthol","Camphor, Menthol","Camphor, Menthol, Methyl Salicylate","Candida Albicans","Capsaicin","Carbamazepine","Carbamide Peroxide","Carbidopa And Levodopa","Carbon Dioxide","Carboprost Tromethamine","Carboxymethylcellulose Sodium","Carisoprodol","Carvedilol","Castor Oil","Cefadroxil","Cefazolin","Cefdinir","Ceftriaxone Sodium","Cefuroxime Axetil","Celecoxib","Cephalexin","Cetirizine HCl","Cetirizine Hydrochloride","Cetylpyridinium Chloride","Childrens Ibuprofen","Chlorhexidine Gluconate","Chlorhexidine Gluconate 4%","Chloroxylenol","Chlorpheniramine Maleate","Chlorpromazine Hydrochloride","Chlorthalidone","Chlorzoxazone","Cholestyramine","Ciclopirox","Cinacalcet","Ciprofloxacin","Ciprofloxacin Hydrochloride","Ciprofolxacin","Citalopram","Citalopram Hydrobromide","Citroma","Clarithromycin","Clindamycin Hydrochloride","Clindamycin Phosphate","Clobazam","Clobetasol Propionate","Clonazepam","Clonidine Hydrochloride","Clopidogrel","Clopidogrel Bisulfate","Clotrimazole","Coal Tar","Colchicine","Cold Sore Fever Blister Treatment","Colesevelam Hydrochloride","Colloidal Oatmeal","Cyanocobalamin","Cyclobenzaprine Hydrochloride","Cyclophosphamide","Cyclosporine","Cyproheptadine Hydrochloride","Dandruff","Dapagliflozin","Dapsone","Daptomycin","Daytime Cold And Flu","Decitabine","Deferasirox","Degree","Desmopressin Acetate","Desonide","Desoximetasone","Desvenlafaxine","Dexamethasone","Dexamethasone Sodium Phosphate","Dexmedetomidine Hydrochloride","Dexmethylphenidate Hydrochloride","Dextroamphetamine Sulfate","Dextromethorphan Hbr","Dextromethorphan Hbr, Guaifenesin","Dextromethorphan Hydrobromide","Dextromethorphan Polistirex","Dextrose","Dextrose Monohydrate","Diazepam","Diclofenac Potassium","Diclofenac Sodium","Diclofenac Sodium Delayed Release","Dicyclomine Hydrochloride","Diethylpropion Hydrochloride","Digoxin","Diltiazem Hydrochloride","Dimenhydrinate","Dimethicone","Diphenhydramine Citrate, Ibuprofen","Diphenhydramine HCl","Diphenhydramine Hydrochloride","Divalproex Sodium","Docetaxel","Docosanol","Docusate Sodium","Docusate Sodium And Sennosides","Donepezil Hydrochloride","Dove","Doxazosin","Doxepin Hydrochloride","Doxorubicin Hydrochloride","Doxycycline","Doxycycline Hyclate","Doxylamine Succinate","Duloxetine","Duloxetine Delayed-Release","Duloxetine Hydrochloride","Enalapril Maleate","Enoxaparin Sodium","Ephedrine Sulfate","Epinephrine","Epsom Salt","Ergocalciferol","Erythromycin","Escitalopram","Escitalopram Oxalate","Esomeprazole","Esomeprazole Magnesium","Estradiol","Eszopiclone","Ethanol","Ethyl Alcohol","Ethyl Alcohol 70%","Ethyl Alcohol 70% V/V","Etodolac","Ezetimibe","Famotidine","Febuxostat","Felodipine","Fenofibrate","Fexofenadine HCl","Fexofenadine Hydrochloride","Finasteride","Flecainide Acetate","Fluconazole","Fluocinolone Acetonide","Fluocinonide","Fluoride","Fluorouracil","Fluoxetine","Fluoxetine Hydrochloride","Fluphenazine Hydrochloride","Fluticasone Propionate","Fluticasone Propionate And Salmeterol","Fluvoxamine Maleate","Folic Acid","Fulvestrant","Furosemide","Gabapentin","Gas Relief","Gemfibrozil","Gentamicin Sulfate","Glimepiride","Glipizide","Glyburide","Glycerin","Glycopyrrolate","Guaifenesin","Guaifenesin And Dextromethorphan Hbr","Guaifenesin, Dextromethorphan Hbr","Guanfacine","Haloperidol","Haloperidol Decanoate","Hawaiian Tropic","Headache Relief Extra Strength","Heparin Sodium","Homosalate, Octisalate, Zinc Oxide","Hydralazine Hydrochloride","Hydrochlorothiazide","Hydrocodone Bitartrate And Acetaminophen","Hydrocortisone","Hydrocortisone Acetate","Hydrogen Peroxide","Hydromorphone Hydrochloride","Hydroxychloroquine Sulfate","Hydroxyzine Hydrochloride","Hydroxyzine Pamoate","Hyoscyamine Sulfate","Ibuprofen","Icosapent Ethyl","Indomethacin","Influenzinum","Ipratropium Bromide","Irbesartan","Isoniazid","Isopropyl Alcohol","Isosorbide Mononitrate","Ivermectin","Ketoconazole","Ketorolac Tromethamine","Ketotifen Fumarate","Labetalol Hydrochloride","Lacosamide","Lactulose","Lamotrigine","Lansoprazole","Laxative","Leflunomide","Leucovorin Calcium","Leuprolide Acetate","Levetiracetam","Levocetirizine Dihydrochloride","Levofloxacin","Levonorgestrel","Levonorgestrel And Ethinyl Estradiol","Levothyroxine Sodium","Lidocaine","Lidocaine 4%","Lidocaine 5%","Lidocaine And Menthol","Lidocaine Hci","Lidocaine HCl","Lidocaine Hydrochloride","Lidocaine, Menthol","Linezolid","Liothyronine Sodium","Lisdexamfetamine Dimesylate","Lisinopril","Lisinopril And Hydrochlorothiazide","Lithium Carbonate","Loperamide HCl","Loperamide Hydrochloride","Loratadine","Lorazepam","Losartan Potassium","Loteprednol Etabonate","Lovastatin","Lubiprostone","Lurasidone Hydrochloride","Magnesium Citrate","Magnesium Hydroxide","Magnesium Sulfate","Magnesium Sulfate Heptahydrate","Meclizine HCl","Meclizine Hydrochloride","Medline","Medroxyprogesterone Acetate","Meloxicam","Memantine Hydrochloride","Menthol","Menthol, Camphor","Menthol, Methyl Salicylate","Menthol, Unspecified Form","Mesalamine","Metaxalone","Metformin HCl","Metformin Hydrochloride","Methadone Hydrochloride","Methimazole","Methocarbamol","Methocarbamol Tablets","Methotrexate","Methyl Salicylate","Methylphenidate Hydrochloride","Methylprednisolone","Metoclopramide","Metolazone","Metoprolol Succinate","Metoprolol Succinate Er Tablets","Metoprolol Tartrate","Metronidazole","Mexiletine Hydrochloride","Miconazole Nitrate","Midazolam Hydrochloride","Midodrine Hydrochloride","Milk Of Magnesia","Mineral Oil","Minocycline Hydrochloride","Minoxidil","Mirtazapine","Modafinil","Mometasone Furoate","Montelukast Sodium","Morphine Sulfate","Motion Sickness Relief","Moxifloxacin Hydrochloride","Mucus Relief","Mucus Relief Dm","Mupirocin","Mycophenolate Mofetil","Nabumetone","Naloxone Hydrochloride","Naltrexone Hydrochloride","Naproxen","Naproxen Sodium","Nebivolol","Neostigmine Methylsulfate","Niacinamide, Adenosine","Nicardipine Hydrochloride","Nicotine","Nicotine Polacrilex","Nifedipine","Nighttime Sleep Aid","Nitrofurantoin","Nitrofurantoin Macrocrystals","Nitrogen","Nitroglycerin","Nitrous Oxide","Norepinephrine Bitartrate","Norethindrone","Norgestimate And Ethinyl Estradiol","Nortriptyline Hydrochloride","Nystatin","Nystatin And Triamcinolone Acetonide","Oatmeal","Octinoxate","Octinoxate And Titanium Dioxide","Octinoxate, Oxybenzone","Octinoxate, Titanium Dioxide","Octinoxate, Titanium Dioxide, Zinc Oxide","Octinoxate, Zinc Oxide","Octisalate, Titanium Dioxide","Ofloxacin","Olanzapine","Olmesartan Medoxomil","Olopatadine Hydrochloride","Olopatadine Hydrochloride Ophthalmic","Omega-3-Acid Ethyl Esters","Omeprazole","Omeprazole Magnesium","Ondansetron","Ondansetron Hydrochloride","Oseltamivir Phosphate","Oxcarbazepine","Oxybutynin Chloride","Oxycodone And Acetaminophen","Oxycodone Hydrochloride","Oxygen","Oxymetazoline Hydrochloride","Pain Relief","Pain Relief Extra Strength","Pain Reliever","Paliperidone","Pantoprazole","Pantoprazole Sodium","Paroxetine","Paroxetine Hydrochloride Hemihydrate","Pectin","Penicillin V Potassium","Perphenazine","Petrolatum","Petroleum","Phenazopyridine Hydrochloride","Phenobarbital","Phenol","Phentermine Hydrochloride","Phenylephrine Hydrochloride","Phenytoin Sodium","Phytonadione","Pioglitazone","Piperacillin And Tazobactam","Piperonyl Butoxide, Pyrethrum Extract","Pirfenidone","Posaconazole","Potassium Chloride","Potassium Citrate","Potassium Nitrate And Sodium Fluoride","Potassium Nitrate, Sodium Fluoride","Povidone Iodine","Povidone-Iodine","Pramipexole Dihydrochloride","Pravastatin Sodium","Prazosin Hydrochloride","Prednisone","Pregabalin","Primidone","Prochlorperazine Maleate","Progesterone","Promethazine Hydrochloride","Propafenone Hydrochloride","Propranolol Hydrochloride","Pseudoephedrine HCl","Pseudoephedrine Hydrochloride","Psyllium Husk","Pyridostigmine Bromide","Pyrithione Zinc","Quetiapine","Quetiapine Fumarate","Rabeprazole Sodium","Ramelteon","Ramipril","Ranolazine","Risperidone","Rivaroxaban","Rizatriptan Benzoate","Rocuronium Bromide","Ropinirole","Ropivacaine Hydrochloride","Rosuvastatin","Rosuvastatin Calcium","Sacubitril And Valsartan","Salicylic Acid","Selenium Sulfide","Sennosides","Sertraline","Sertraline Hydrochloride","Sevelamer Carbonate","Sildenafil","Sildenafil Citrate","Silver Sulfadiazine","Simethicone","Simvastatin","Sleep Aid","Sodium Bicarbonate","Sodium Bicarbonate, Sodium Chloride","Sodium Chloride","Sodium Fluoride","Sodium Monofluorophosphate","Solifenacin Succinate","Sotalol Hydrochloride","Spironolactone","Stannous Fluoride","Sterile Water","Stool Softener","Stool Softener Laxative","Succinylcholine Chloride","Sucralfate","Sulfacetamide Sodium, Sulfur","Sulfamethoxazole And Trimethoprim","Sulfur","Sumatriptan","Sumatriptan Succinate","Tacrolimus","Tadalafil","Tamsulosin Hydrochloride","Telmisartan","Temazepam","Terazosin","Terazosin Hydrochloride","Terbinafine Hydrochloride","Testosterone","Testosterone Cypionate","Theophylline","Ticagrelor","Timolol Maleate","Titanium Dioxide","Titanium Dioxide And Zinc Oxide","Titanium Dioxide, Zinc Oxide","Tizanidine","Tizanidine Hydrochloride","Tobramycin","Tolnaftate","Tolnaftate 1%","Topiramate","Torsemide","Tramadol Hydrochloride","Tranexamic Acid","Trazodone Hydrochloride","Tretinoin","Triamcinolone Acetonide","Triamterene And Hydrochlorothiazide","Triple Antibiotic","Trospium Chloride","Undecylenic Acid","Urea","Ursodiol","Valacyclovir","Valacyclovir Hydrochloride","Valsartan","Valsartan And Hydrochlorothiazide","Vancomycin Hydrochloride","Venlafaxine","Venlafaxine Hydrochloride","Verapamil Hydrochloride","Voriconazole","Warfarin Sodium","Water","White Petrolatum","Witch Hazel","Zinc Oxide","Zinc Oxide And Titanium Dioxide","Zinc Oxide, Titanium Dioxide","Zoledronic Acid","Zolmitriptan","Zolpidem Tartrate","Zonisamide"];

/** Instant local prefix/substring suggestions from the bundled list. */
export function localDrugSuggest(q: string, limit = 8): string[] {
  const t = q.trim().toLowerCase();
  if (t.length < 2) return [];
  const starts: string[] = [];
  const contains: string[] = [];
  for (const n of DRUG_NAMES) {
    const lc = n.toLowerCase();
    if (lc.startsWith(t)) starts.push(n);
    else if (lc.includes(t)) contains.push(n);
  }
  return [...starts, ...contains].slice(0, limit);
}
