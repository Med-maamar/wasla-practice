/**
 * French translation catalog for the WASLA practice application.
 *
 * The `Messages` type imported from the English catalog guarantees key parity.
 */
import type { Messages } from "@/messages/en";

export const fr: Messages = {
  appTitle: "Gestionnaire de taches WASLA",
  homeTitle: "Pratiquez l'architecture WASLA avec un vrai flux de taches.",
  homeDescription:
    "Utilisez le mock BFF, les composants reutilisables et l'interface bilingue pour gerer les taches de bout en bout.",
  openTasks: "Ouvrir les taches",
  tasks: "Taches",
  createTask: "Creer une tache",
  editTask: "Modifier la tache",
  deleteTask: "Supprimer la tache",
  deleteConfirmTitle: "Etes-vous sur ?",
  deleteConfirmDescription: "Cette action est irreversible.",
  title: "Titre",
  description: "Description",
  status: "Statut",
  statusTodo: "A faire",
  statusInProgress: "En cours",
  statusDone: "Termine",
  save: "Enregistrer",
  cancel: "Annuler",
  delete: "Supprimer",
  edit: "Modifier",
  loading: "Chargement...",
  noTasks: "Aucune tache trouvee.",
  previous: "Precedent",
  next: "Suivant",
  page: "Page",
  language: "Langue",
  english: "Anglais",
  french: "Francais",
  loadError: "Impossible de charger les taches.",
  createSuccess: "Tache creee avec succes.",
  updateSuccess: "Tache mise a jour avec succes.",
  deleteSuccess: "Tache supprimee avec succes.",
  submitError: "Impossible d'enregistrer la tache.",
  deleteError: "Impossible de supprimer la tache.",
  emptyDescription: "Aucune description fournie.",
};
