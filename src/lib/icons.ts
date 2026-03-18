/**
 * Centralized icons registry.
 *
 * The application imports icons exclusively through this module so swapping the
 * underlying icon source later stays localized to one file.
 */
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  Globe,
  ListTodo,
  Loader2,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

export const Icons = {
  add: Plus,
  app: ListTodo,
  cancel: X,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  delete: Trash2,
  edit: Pencil,
  globe: Globe,
  loader: Loader2,
  save: Save,
  statusDone: CheckCircle2,
  statusInProgress: Clock3,
  statusTodo: Circle,
} as const;
