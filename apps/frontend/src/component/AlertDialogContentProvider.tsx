"use client"
import axios from "axios";
import { PlusIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@repo/ui/components/alert-dialog";
import { Button } from "@repo/ui/components/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@repo/ui/components/field"
import { Input } from "@repo/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select"
import { ClubRole, createClubSchema } from "@repo/shared-types"
import { useState } from "react";
import toast from "react-hot-toast";

export const AlertDialogContentProvider = async () => {
  const [clubName, setClubName] = useState("");
  const [area, setArea] = useState("");
  const [division, setDivision] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedRoleInClub, setSelectedRoleInClub] = useState("");
  const roles = Object.values(ClubRole);

  const region = [
    "Koshi Province",
    "Madhesh Province",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpashchim Province"
  ]

  const district = [
    "Taplejung",
    "Sankhuwasabha",
    "Solukhumbu",
    "Okhaldhunga",
    "Khotang",
    "Bhojpur",
    "Dhankuta",
    "Terhathum",
    "Panchthar",
    "Ilam",
    "Jhapa",

    "Morang",
    "Sunsari",
    "Udayapur",
    "Saptari",
    "Siraha",
    "Dhanusha",
    "Mahottari",
    "Sarlahi",

    "Sindhuli",
    "Ramechhap",
    "Dolakha",
    "Bhaktapur",
    "Dhading",
    "Kathmandu",
    "Kavrepalanchok",
    "Lalitpur",
    "Nuwakot",
    "Rasuwa",
    "Sindhupalchok",

    "Chitwan",
    "Makwanpur",
    "Parsa",
    "Bara",
    "Rautahat",

    "Gorkha",
    "Manang",
    "Mustang",
    "Myagdi",
    "Kaski",
    "Lamjung",
    "Tanahun",
    "Nawalpur",
    "Syangja",
    "Parbat",
    "Baglung",

    "Gulmi",
    "Palpa",
    "Nawalparasi (West)",
    "Rupandehi",
    "Kapilvastu",
    "Arghakhanchi",
    "Pyuthan",
    "Rolpa",
    "Rukum (East)",
    "Rukum (West)",
    "Salyan",
    "Dang",
    "Banke",
    "Bardiya",

    "Dolpa",
    "Jumla",
    "Kalikot",
    "Mugu",
    "Humla",
    "Dailekh",
    "Jajarkot",
    "Surkhet",

    "Bajura",
    "Bajhang",
    "Darchula",
    "Baitadi",
    "Dadeldhura",
    "Doti",
    "Achham",
    "Kailali",
    "Kanchanpur"
  ]



  const handleCreateClub = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = await createClubSchema.safeParse({
      name: clubName,
      region: selectedRegion,
      district: selectedDistrict,
      division: division,
      area: area,
      role_in_club: selectedRoleInClub,
      user_name: "one"
    })
    if (!validation.success) {
      toast("Club Creation fail")
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/club`, validation.data)
      .then((res) => {
        if (res.status > 300) {
          return toast(res.data.message)
        }
      })
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Create Club</AlertDialogTitle>
        <AlertDialogDescription>
          <form onSubmit={handleCreateClub}>
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                      Club Name
                    </FieldLabel>
                    <Input
                      id="checkout-7j9-card-name-43j"
                      placeholder="Youth Club"
                      required
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                    />
                  </Field>
                  <div className="flex gap-2 w-full">
                    <Field>
                      <FieldLabel htmlFor="Area">
                        Your Area
                      </FieldLabel>
                      <Input
                        id="Area"
                        placeholder="Dhapakhel"
                        required
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="division">Division</FieldLabel>
                      <Input
                        id="division"
                        placeholder="seven"
                        required
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Field>
                      <FieldLabel htmlFor="provience">
                        Provience
                      </FieldLabel>
                      <Select
                        value={selectedRegion}
                        onValueChange={(value) => setSelectedRegion(value)}
                      >
                        <SelectTrigger id="provience">
                          <SelectValue placeholder={region[0]} />
                        </SelectTrigger>
                        <SelectContent>
                          {region.map((reg) =>
                            <SelectItem value={reg}>{reg}</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="district">
                        District
                      </FieldLabel>
                      <Select
                        value={selectedDistrict}
                        onValueChange={(value) => setSelectedDistrict(value)}
                      >
                        <SelectTrigger id="district">
                          <SelectValue placeholder={district[0]} />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            district.map((dis) =>
                              <SelectItem value={dis}>{dis}</SelectItem>
                            )
                          }
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="role_in_club">
                        Role in Club
                      </FieldLabel>
                      <Select
                        value={selectedRoleInClub}
                        onValueChange={(value) => setSelectedRoleInClub(value)}
                      >
                        <SelectTrigger id="role_in_club">
                          <SelectValue placeholder={Object.keys(ClubRole)[0]} />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            Object.values(ClubRole).map(role =>
                              <SelectItem value={role}>{role}</SelectItem>
                            )
                          }
                        </SelectContent>
                      </Select>
                    </Field>

                  </div>
                </FieldGroup>
              </FieldSet>
              <Field orientation="horizontal">
                <Button type="submit">Submit</Button>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </Field>
            </FieldGroup>
          </form>
        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  )
}