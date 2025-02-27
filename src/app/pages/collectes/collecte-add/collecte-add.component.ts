import {Component, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatToolbar} from "@angular/material/toolbar";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {BaseModel} from "../../../shared/models/baseModel";
import {FormatStructurePipe} from "../../../shared/pipes/format-structure.pipe";
import {MatCheckbox} from "@angular/material/checkbox";
import {
  FEMININ,
  MASCULIN,
  NON,
  NON_PRECIS,
  NON_RENSEIGNE,
  OUI,
  RENSEIGNE,
  structuresPrivees, structuresPubliques
} from "../../../shared/constants";
import {services} from "../../../shared/data/service";
import {nationalites} from "../../../shared/data/nationalite";
import {modeDeVies} from "../../../shared/data/mode-de-vie";
import {regions} from "../../../shared/data/region";
import {situationMatrimoniales} from "../../../shared/data/situation-matrimoniale";
import {departements} from "../../../shared/data/departement";
import {localisationCancer} from "../../../shared/data/localisation-cancer";
import {typeHistologique} from "../../../shared/data/type-histologique";
import {baseDiagnostic} from "../../../shared/data/base-diagnostic";
import {grades} from "../../../shared/data/grade";
import {tailleTumeurs} from "../../../shared/data/taille-tumeur";
import {presenceMetastases} from "../../../shared/data/presence-metastase";
import {atteintesGanglionnaire} from "../../../shared/data/atteinte-ganglionnaire";
import {stadeOms} from "../../../shared/data/stadeOms";
import {nonTraitements} from "../../../shared/data/non-traitement";
import {traitements} from "../../../shared/data/traitement";
import {etatPatients} from "../../../shared/data/etat-patient";
import {CollecteService} from "../../../core/services/collecte.service";
import Swal from 'sweetalert2';
import {MatTooltip} from "@angular/material/tooltip";

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
    MatCheckbox,
    MatTooltip
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
  isLinear = true //TODO CHANGE
  secondForm!: FormGroup;
  thirdForm!: FormGroup;
  fourthForm!: FormGroup;
  fifthForm!: FormGroup;
  sixthForm!: FormGroup;
  typeStructureText = "public"
  autreService = false
  autreNationalite = false
  autreSituationMatrimoniale = false
  autreTypeHistologique   = false
  autreLocalisationCancer  = false
  autrePerteDeVue = ""
  autreRecepteurOestrogene = ""
  autreRecepteurProgesterone = ""
  existenceMetastase  = false
  autreEtatPatient  = false
  autreExistenceMetastase  = ""
  autreBaseDiagnostic  = false
  autreRecepteurHer2 = ""
  typeStructures: BaseModel[] = structuresPubliques
  nationalites: BaseModel[] = nationalites
  situationMatrimoniales: BaseModel[] = situationMatrimoniales
  services: BaseModel[] = services
  regions: BaseModel[] = regions
  departments: any = []
  modeDeVies: BaseModel[] = modeDeVies
  localisationCancers: BaseModel[] = localisationCancer
  typeHistologiques: BaseModel[] = typeHistologique
  basesDiagnostic: BaseModel[] = baseDiagnostic
  ctnmTailleTumeurs: BaseModel[] = tailleTumeurs
  grades: BaseModel[] = grades
  ctnmAtteinteGanglionnaires: BaseModel[] = atteintesGanglionnaire
  ctnmMetastases: BaseModel[] = presenceMetastases
  stadesOms: BaseModel[] = stadeOms
  traitements: BaseModel[] = traitements
  nonTraitements: BaseModel[] = nonTraitements
  etatPatients: BaseModel[] = etatPatients
  recepteursHer2: BaseModel[] = []
  existencesMetastasesAutres: BaseModel[] = localisationCancer
  fb = inject(FormBuilder)
  _collecteService = inject(CollecteService)
  dialogRef = inject(MatDialogRef<CollecteAddComponent>)

  ngOnInit(): void {
    this.initForm()
    this.initSecondForm()
    this.initThirdForm()
    this.initFourthForm()
    this.initFifthForm()
  }

  initForm(){
    this.form = this.fb.group({
      nomCompletRegistraire: ['', Validators.required],
      nomCompletMedecinReferent: ['', Validators.required],
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
      if(value == "prive"){
        this.typeStructures = structuresPrivees
      }
      else if(value == "public"){
        this.typeStructures = structuresPubliques
      }
    })
    let typeStructureValue =  this.form.get('typeStructureValue') as FormControl;
    typeStructureValue.valueChanges.subscribe(value => {
      if(value.name == "Autre à préciser"){
        typeStructure.setValue("autre")
        typeStructureValue.setValue("")
      }
    })

    let service =  this.form.get('service') as FormControl;
    service.valueChanges.subscribe(checked => {
        this.autreService = checked
    })
    let serviceValue =  this.form.get('serviceValue') as FormControl;
    serviceValue.valueChanges.subscribe(value => {
      if(value.name == "Autre à préciser"){
        service.setValue("autre")
        serviceValue.setValue("")
      }
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
      situationMatrimoniale: [false],
      situationMatrimonialeValue: ["", Validators.required],
      modeDeVie: ["", Validators.required],
      expositionToxique: ["", Validators.required],
    })
    let nationalite =  this.secondForm.get('nationalite') as FormControl;
    nationalite.valueChanges.subscribe(checked => {
      this.autreNationalite = checked
      if(checked)
        nationaliteValue.setValue("")
    })

    let nationaliteValue =  this.secondForm.get('nationaliteValue') as FormControl;
    nationaliteValue.valueChanges.subscribe(value => {
      if(value.name == "Autre à préciser"){
        nationalite.setValue("autre")
        nationaliteValue.setValue("")
      }
    })

    let situationMatrimoniale =  this.secondForm.get('situationMatrimoniale') as FormControl;
    situationMatrimoniale.valueChanges.subscribe(checked => {
      this.autreSituationMatrimoniale = checked
      if(checked)
        situationMatrimonialeValue.setValue("")
    })

    let situationMatrimonialeValue =  this.secondForm.get('situationMatrimonialeValue') as FormControl;
    situationMatrimonialeValue.valueChanges.subscribe(value => {
      if(value.name == "Autre à préciser"){
        situationMatrimoniale.setValue("autre")
        situationMatrimonialeValue.setValue("")
      }
    })

    let region =  this.secondForm.get('region') as FormControl;
    region.valueChanges.subscribe(value => {
      const selectedRegion: any = departements.find(dept => Object.keys(dept)[0] === value.name);
      this.departments = selectedRegion ? selectedRegion[value.name] : [];
    })
  }

  initThirdForm(){
    this.thirdForm = this.fb.group({
      cniPatient: [NON_RENSEIGNE, Validators.required],
      contactPatient: [NON_RENSEIGNE, Validators.required],
      contactProchePatient: [NON_RENSEIGNE, Validators.required],
      adressePatient: [RENSEIGNE, Validators.required],
      consentementPatient: [OUI, Validators.required],
      stadePatient: [NON_RENSEIGNE, Validators.required],
      compteRenduPatient: [NON_RENSEIGNE, Validators.required],
      dateDiagnosticPatient: [RENSEIGNE, Validators.required],
      dateDebutConsultationPatient: [NON_RENSEIGNE, Validators.required],
      dateSuivanteConsultationPatient: [NON_RENSEIGNE, Validators.required],
    })
  }

  initFourthForm(){
    this.fourthForm = this.fb.group({
      dateDiagnostic: ["", Validators.required],
      localisationCancer: [""],
      localisationCancerValue: ["", Validators.required],
      typeHistologique: [""],
      typeHistologiqueValue: ["", Validators.required],
      baseDiagnostic: [""],
      baseDiagnosticValue: ["", Validators.required],
      grade: ["", Validators.required],
      ctnmTailleTumeur: ["", Validators.required],
      ctnmAtteinteGanglionnaire: ["", Validators.required],
      ctnmMetastase: ["", Validators.required],
      stadeOms: ["", Validators.required],
      recepteurOestrogene: [""],
      recepteurOestrogeneValue: ["", Validators.required],
      recepteurProgesterone: [""],
      recepteurProgesteroneValue: ["", Validators.required],
      recepteurHer2: [""],
      recepteurHer2Value: ["", Validators.required],
      tripleNegatif: ["", Validators.required],
      statutCancer: ["", Validators.required],
      metastaseAutre: [""],
      existenceMetastase: ["", Validators.required],
      existenceMetastaseValue: [""],
      existenceMetastaseAutreValue: [""],
      traitement: [""],
      dateDebutTraitement: [""],
      lieuTraitement: [""],
      causeNonDebutTraitement: [""],
    })

    let localisationCancer =  this.fourthForm.get('localisationCancer') as FormControl;
    localisationCancer.valueChanges.subscribe(checked => {
      this.autreLocalisationCancer = checked
      if(checked)
        localisationCancerValue.setValue(null)
    })

    let localisationCancerValue =  this.fourthForm.get('localisationCancerValue') as FormControl;

    let typeHistologique =  this.fourthForm.get('typeHistologique') as FormControl;
    typeHistologique.valueChanges.subscribe(checked => {
      this.autreTypeHistologique = checked
      if(checked)
        typeHistologiqueValue.setValue(null)
    })

    let typeHistologiqueValue =  this.fourthForm.get('typeHistologiqueValue') as FormControl;


    let baseDiagnostic =  this.fourthForm.get('baseDiagnostic') as FormControl;
    baseDiagnostic.valueChanges.subscribe(checked => {
      this.autreBaseDiagnostic = checked
      if(checked)
        baseDiagnosticValue.setValue(null)
    })

    let baseDiagnosticValue =  this.fourthForm.get('baseDiagnosticValue') as FormControl;


    let recepteurOestrogene =  this.fourthForm.get('recepteurOestrogene') as FormControl;
    recepteurOestrogene.valueChanges.subscribe(value => {
      this.autreRecepteurOestrogene = value
      if(value)
        recepteurOestrogeneValue.setValue(null)
    })
    let recepteurOestrogeneValue =  this.fourthForm.get('recepteurOestrogeneValue') as FormControl;
    this.handleFormControlChanges(recepteurOestrogene, recepteurOestrogeneValue, value => value === NON_PRECIS, null);

    let recepteurProgesterone =  this.fourthForm.get('recepteurProgesterone') as FormControl;
    recepteurProgesterone.valueChanges.subscribe(checked => {
      this.autreRecepteurProgesterone = checked
      if(checked)
        recepteurProgesteroneValue.setValue(null)
    })
    let recepteurProgesteroneValue =  this.fourthForm.get('recepteurProgesteroneValue') as FormControl;
    this.handleFormControlChanges(recepteurProgesterone, recepteurProgesteroneValue, value => value === NON_PRECIS, null);


    let recepteurHer2 =  this.fourthForm.get('recepteurHer2') as FormControl;
    recepteurHer2.valueChanges.subscribe(checked => {
      this.autreRecepteurHer2 = checked
      if(checked)
        recepteurHer2Value.setValue(null)
    })
    let recepteurHer2Value =  this.fourthForm.get('recepteurHer2Value') as FormControl;
    this.handleFormControlChanges(recepteurHer2, recepteurHer2Value, value => value === NON_PRECIS, null);

    let existenceMetastase =  this.fourthForm.get('existenceMetastase') as FormControl;
    existenceMetastase.valueChanges.subscribe(value => {
      this.getFormValidationErrors()
      this.autreExistenceMetastase = ""
      if(value == this.OUI)
        this.existenceMetastase = true
      else
        this.existenceMetastase = false
    })

    let existenceMetastaseAutreValue =  this.fourthForm.get('existenceMetastaseAutreValue') as FormControl;
    existenceMetastaseAutreValue.valueChanges.subscribe(checked => {
        if(checked){
          this.autreExistenceMetastase = "autre"
        }
        else{
          this.autreExistenceMetastase = ""
        }
    })

    let existenceMetastaseValue =  this.fourthForm.get('existenceMetastaseValue') as FormControl;
    existenceMetastaseValue.valueChanges.subscribe(value => {
      this.getFormValidationErrors()
      if(value.name == "Autre à préciser"){
        this.autreExistenceMetastase = "autre"
        existenceMetastaseValue.setValue("")
        existenceMetastaseAutreValue.setValue(true)
      }
    })
  }

  initFifthForm(){
    this.fifthForm = this.fb.group({
      date: ["", Validators.required],
      etatPatient: [""],
      etatPatientValue: ["", Validators.required],
      perduDeVue: ["", Validators.required],
      perduDeVueValue: [""],
      infosComplementaires: [""],
    })

    let etatPatient =  this.fifthForm.get('etatPatient') as FormControl;

    etatPatient.valueChanges.subscribe(checked => {
      this.autreEtatPatient = checked
      if(checked)
        etatPatientValue.setValue("")
    })
    let etatPatientValue =  this.fifthForm.get('etatPatientValue') as FormControl;
    etatPatientValue.valueChanges.subscribe(value => {
      if(value.name == "Autres causes de décès à préciser"){
        etatPatient.setValue("autre")
        etatPatientValue.setValue("")
      }
    })

    let perduDeVue =  this.fifthForm.get('perduDeVue') as FormControl;
    let perduDeVueValue =  this.fifthForm.get('perduDeVueValue') as FormControl;
    perduDeVue.valueChanges.subscribe(value => {
      this.autrePerteDeVue = value;
    });

    this.handleFormControlChanges(perduDeVue, perduDeVueValue, value => value === NON_PRECIS, null);
  }

  private handleFormControlChanges(
    control: FormControl,
    targetControl: FormControl,
    conditionFn: (value: any) => boolean,
    newValue: any = null
  ) {
    control.valueChanges.subscribe(value => {
      if (conditionFn(value)) {
        targetControl.setValue(newValue);
        targetControl.setValidators([Validators.required]);
      } else {
        targetControl.removeValidators([Validators.required]);
      }
      targetControl.updateValueAndValidity();
    });
  }
  save(){
    let collectes = []
    this._collecteService.getCollectes().subscribe({
      next: (data) => {
        console.log(data.length)
        collectes = data
      }
    })
    let body = {
      identification: this.form.value ,
      infosPatient: this.secondForm.value,
      exhaustivite: this.thirdForm.value,
      tumeur: this.fourthForm.value,
      suiviPatient: this.fifthForm.value,
    }
    console.log(body)
    this._collecteService.saveCollecte(body).subscribe({
      next: value => {
        Swal.fire({
          title: 'Succès!',
          text: 'Ajout effectué !',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.dialogRef.close()
      },
      error: err => {
        Swal.fire({
          title: 'Erreur!',
          text: 'Ajout non effectué !',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    })
  }

  getFormValidationErrors() {

    console.log('%c ==>> Validation Errors: ', 'color: red; font-weight: bold; font-size:25px;');
    let totalErrors = 0;

    const checkControlErrors = (control: AbstractControl, path: string = '') => {
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(key => {
          checkControlErrors(control.get(key)!, `${path}${path ? '.' : ''}${key}`);
        });
      } else if (control instanceof FormArray) {
        control.controls.forEach((ctrl, index) => {
          checkControlErrors(ctrl, `${path}[${index}]`);
        });
      } else if (control.errors) {
        totalErrors++;
        Object.keys(control.errors).forEach(keyError => {
          console.log(`Path: ${path}, Error: ${keyError}, Value:`, control.errors![keyError]);
        });
      }
    };

    checkControlErrors(this.fourthForm);

    console.log('Number of errors: ', totalErrors);
  }

}
