import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) {
  }

  //endpoint per doktoret
  addDoctor(doctor: any) {
    doctor.id = this.afs.createId();
    return this.afs.collection("Doctor/").add(doctor);
  }

  getAllDoctors() {
    return this.afs.collection("Doctor/").snapshotChanges();
  }

  updateDoctor(doctor: any) {
    return this.afs.doc("Doctor/" + doctor.id).update(doctor);
  }

  deleteDoctor(id: string) {
    return this.afs.doc("Doctor/" + id).delete();
  }

  getDoctorById(id: any) {
    return this.afs.doc("Doctor/" + id).valueChanges();
  }

  // endpoint per pacientet
  addPatient(patient: any) {
    patient.patient_id = this.afs.createId();
    return this.afs.collection("Patient/").add(patient);
  }

  getAllPatients() {
    return this.afs.collection("Patient/").snapshotChanges();
  }

  updatePatient(patient: any) {
    return this.afs.doc("Patient/" + patient.patient_id).update(patient);
  }

  deletePatient(id: string) {
    return this.afs.doc("Patient/" + id).delete();
  }

  getPatientById(id: any) {
    return this.afs.doc("Patient/" + id).valueChanges();
  }

  // endpoint per recetat
  addReceipt(receipt: any) {
    receipt.receipt_id = this.afs.createId();
    return this.afs.collection("Receipt/").add(receipt);
  }

  getAllReceipts() {
    return this.afs.collection("Receipt/").snapshotChanges();
  }

  updateReceipt(receipt: any) {
    return this.afs.doc("Receipt/" + receipt.receipt_id).update(receipt);
  }

  deleteReceipt(id: string) {
    return this.afs.doc("Receipt/" + id).delete();
  }

  getReceiptById(id: any) {
    return this.afs.doc("Receipt/" + id).valueChanges();
  }

  // endpoint per vizitat
  addVisit(visit: any) {
    visit.visit_id = this.afs.createId();
    return this.afs.collection("Visit/").add(visit);
  }

  getAllVisits() {
    return this.afs.collection("Visit/").snapshotChanges();
  }

  updateVisit(visit: any) {
    return this.afs.doc("Visit/" + visit.visit_id).update(visit);
  }

  deleteVisit(id: string) {
    return this.afs.doc("Visit/" + id).delete();
  }

  getVisitById(id: any) {
    return this.afs.doc("Visit/" + id).valueChanges();
  }
}
