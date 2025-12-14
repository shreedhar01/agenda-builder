"use client"
import { PlusIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogTrigger
} from "@repo/ui/components/alert-dialog";
import { Button } from "@repo/ui/components/button"
import { AlertDialogContentProvider } from "../../component/AlertDialogContentProvider";
import { Header } from "../../component/Header";

export default function Home() {
 
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Header/>
      <div className="flex justify-between w-full md:w-7xl px-2 md:px-0">
        <h1>Agenda Builder</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              <h1>Create Club</h1>
              <PlusIcon></PlusIcon>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContentProvider/>
        </AlertDialog>
      </div>
      <div>
        <h1>no</h1>
      </div>
    </div>
  );
}
