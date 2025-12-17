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
import { CreateClub } from "../../component/CreateClub";
import { Header } from "../../component/Header";
import { YourClubs } from "../../component/YourClubs";
import { Dialog, DialogTrigger } from "@repo/ui/components/dialog"
import { JoinClub } from "../../component/JoinClub";
import { YourAgendas } from "../../component/YourAgendas";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Header />
      <div className="flex justify-end w-full md:w-7xl py-8 px-2 md:px-0">
        <div className="flex items-center gap-2 ">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                Join Club
                <HeartHandshakeIcon></HeartHandshakeIcon>
              </Button>
            </DialogTrigger>
            <JoinClub />
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <h1>Create Club</h1>
                <PlusIcon></PlusIcon>
              </Button>
            </DialogTrigger>
            <CreateClub />
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between gap-y-4 w-full md:w-7xl  h-[78vh] px-2 md:px-0">
        <div className="flex flex-col gap-2 h-1/2 md:h-full w-full md:w-70/100">
          <h1 className="text-xl md:text-2xl font-medium ">Your Agendas :</h1>
          <div className="flex-1 min-h-0">
            <YourAgendas/>
          </div>
        </div>
        <div className="flex flex-col gap-2 h-1/2 md:h-full w-full md:w-25/100">
          <h1 className="text-xl md:text-2xl font-medium ">Your Clubs :</h1>
          <div className="flex-1 min-h-0 overflow-hidden">
            <YourClubs />
          </div>
        </div>
      </div>
    </div>
  );
}
