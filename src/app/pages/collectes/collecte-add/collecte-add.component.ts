import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatToolbar} from "@angular/material/toolbar";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatDialogClose} from "@angular/material/dialog";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {BaseModel} from "../../../shared/models/baseModel";
import {FormatStructurePipe} from "../../../shared/pipes/format-structure.pipe";
import {MatCheckbox} from "@angular/material/checkbox";
import {FEMININ, MASCULIN, NON, NON_PRECIS, NON_RENSEIGNE, OUI, RENSEIGNE} from "../../../shared/constants";

@Component({
  selector: 'app-collecte-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatStep,
    MatStepper,
    MatToolbar,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatError,
    MatStepperPrevious,
    MatButton,
    MatDialogClose,
    MatStepperNext,
    MatInput,
    MatStepLabel,
    NgIf,
    MatRadioButton,
    MatRadioGroup,
    NgForOf,
    FormatStructurePipe,
    MatCheckbox
  ],
  templateUrl: './collecte-add.component.html',
  styleUrl: './collecte-add.component.css'
})
export class CollecteAddComponent implements OnInit {
  protected readonly RENSEIGNE = RENSEIGNE;
  protected readonly NON_RENSEIGNE = NON_RENSEIGNE;
  protected readonly NON = NON;
  protected readonly OUI = OUI;
  protected readonly MASCULIN = MASCULIN;
  protected readonly FEMININ = FEMININ;
  protected readonly NON_PRECIS = NON_PRECIS;
  form!: FormGroup;
  isLoading = false;
  isLinear = false //TODO CHANGE
  secondForm!: FormGroup;
  thirdForm!: FormGroup;
  fourthForm!: FormGroup;
  fifthForm!: FormGroup;
  sixthForm!: FormGroup;
  typeStructureText = "public"
  autreService = false
  autreNationalite = false
  typeStructures: BaseModel[] = []
  nationalites: BaseModel[] = []
  situationMatrimoniales: BaseModel[] = []
  services: BaseModel[] = []
  regions: BaseModel[] = []
  departements: BaseModel[] = []
  modeDeVies: BaseModel[] = []
  fb = inject(FormBuilder)
  ngOnInit(): void {
    this.initForm()
    this.initSecondForm()
    this.initThirdForm()
  }

  initForm(){
    this.form = this.fb.group({
      nomCompletRegistraire: ['', Validators.required],
      nomCompletPatient: ['', Validators.required],
      dateOuvertureDossier: ['', Validators.required],
      numeroDossier: ['0000', Validators.required],
      typeStructure: ['public', Validators.required],
      typeStructureValue: ['', Validators.required],
      service: [false],
      serviceValue: ['', Validators.required],
    })

    let typeStructure =  this.form.get('typeStructure') as FormControl;
    typeStructure.valueChanges.subscribe(value => {
      this.typeStructureText = value
    })

    let service =  this.form.get('service') as FormControl;
    service.valueChanges.subscribe(checked => {
        this.autreService = checked
    })

  }
  initSecondForm(){
    this.secondForm = this.fb.group({
      nomComplet: ['', Validators.required],
      age: ["", Validators.required],
      sexe: ['masculin', Validators.required],
      quartierOuVillage: ["", Validators.required],
      nationalite: [false],
      nationaliteValue: ["", Validators.required],
      region: ["", Validators.required],
      departement: ["", Validators.required],
      situationMatrimoniale: ["", Validators.required],
      modeDeVie: ["", Validators.required],
      expositionToxique: ["", Validators.required],
    })
    let nationalite =  this.secondForm.get('nationalite') as FormControl;
    nationalite.valueChanges.subscribe(checked => {
      this.autreNationalite = checked
    })
  }

  initThirdForm(){
    this.thirdForm = this.fb.group({
      cniPatient: ["", Validators.required],
      contactPatient: ["", Validators.required],
      contactProchePatient: ["", Validators.required],
      adressePatient: ["", Validators.required],
      consentementPatient: ["", Validators.required],
      stadePatient: ["", Validators.required],
      compteRenduPatient: ["", Validators.required],
      dateDiagnosticPatient: ["", Validators.required],
      dateDebutConsultationPatient: ["", Validators.required],
      dateSuivanteConsultationPatient: ["", Validators.required],
    })
  }

  initFourthForm(){
    this.fourthForm = this.fb.group({
      dateDiagnostic: ["", Validators.required],
      localisationCancerORL: ["", Validators.required],
      localisationCancerAutre: ["", Validators.required],
      typeHistologique: ["", Validators.required],
      baseDiagnostic: ["", Validators.required],
      ctnmTailleTumeur: ["", Validators.required],
      ctnmAtteiteGanglionnaire: ["", Validators.required],
      ctnmMetastase: ["", Validators.required],
      stadeOms: ["", Validators.required],
      recepteurOeustrogene: ["", Validators.required],
      recepteurProgesterone: ["", Validators.required],
      recepteurHer2: ["", Validators.required],
      tripleNegatif: ["", Validators.required],
      statutCancer: ["", Validators.required],
      metastaseAutre: ["", Validators.required],
      existencesMetastasesAutre: ["", Validators.required],
      metastaseORL: ["", Validators.required],
      existencesMetastasesORL: ["", Validators.required],
    })
  }

  initFifthForm(){
    this.fifthForm = this.fb.group({
      date: ["", Validators.required],
      etatPatient: ["", Validators.required],
      etatPatientValue: ["", Validators.required],
      perduDeVue: ["", Validators.required],
      perduDeVueValue: ["", Validators.required],
      infosComplementaires: ["", Validators.required],
    })
  }
  save(){

  }
}
