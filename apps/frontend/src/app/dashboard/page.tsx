"use client"
import { 
  PlusIcon,
  HeartHandshakeIcon
 } from "lucide-react";

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
      <Header />
      <div className="flex justify-end w-full md:w-7xl pt-8 px-2 md:px-0">
        <div className="flex items-center gap-2 ">
          <Button className="">
            Join Club
            <HeartHandshakeIcon></HeartHandshakeIcon>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="lg" variant="outline">
                <h1>Create Club</h1>
                <PlusIcon></PlusIcon>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContentProvider />
          </AlertDialog>
        </div>
      </div>
      <div>
        <h1>no</h1>
      </div>
    </div>
  );
}
