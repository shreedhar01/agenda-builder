"use client"
import axios from "axios";

import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { useState } from "react";
import toast from "react-hot-toast";

import { ClubRole, createClubSchema, ErrorType } from "@repo/shared-types"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state-management/store";
import { joinClub } from "../state-management/slice/clubSlice";

export const AlertDialogContentProvider = () => {
  const [clubName, setClubName] = useState("");
  const [area, setArea] = useState("");
  const [division, setDivision] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedRoleInClub, setSelectedRoleInClub] = useState("");
  // const roles = Object.values(ClubRole);
  const [error, setError] = useState<ErrorType[]>()

  const dispatch = useDispatch();

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
    setError([])
    const validation = await createClubSchema.safeParse({
      name: clubName,
      region: selectedRegion,
      district: selectedDistrict,
      division: division,
      area: area,
      role_in_club: selectedRoleInClub,
    })
    if (!validation.success) {
      const errors: ErrorType[] = validation.error.issues
        .filter(err => err.path.length > 0 && typeof err.path[0] === 'string')
        .map(err => ({
          path: err.path[0] as string,
          message: err.message
        }));
      setError(errors);
      return toast.error("Club not created");
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/club`, validation.data, { withCredentials: true })
      .then((res) => {
        const clubData = res.data.data?.[0]
        if (clubData && clubData.id && clubData.name) {
          dispatch(joinClub(clubData))
          toast.success(res.data.message)
          setClubName("");
          setArea("");
          setDivision("");
          setSelectedDistrict("");
          setSelectedRegion("");
          setSelectedRoleInClub("");
        } else {
          console.error('Invalid club data:', clubData)
          toast.error('Failed to join club - invalid data')
        }
      })
      .catch((error) => {
        console.error('Axios error:', error)
        toast.error(error.response?.data?.message || 'Something went wrong')
      })
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Create Club</AlertDialogTitle>
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
                  {error?.find(err => err.path === "name")?.message && (
                    <p className="text-sm text-red-500">{error.find(err => err.path === "name")?.message}</p>
                  )}
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
                    {error?.find(err => err.path === "area")?.message && (
                      <p className="text-sm text-red-500">{error.find(err => err.path === "area")?.message}</p>
                    )}
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
                    {error?.find(err => err.path === "division")?.message && (
                      <p className="text-sm text-red-500">{error.find(err => err.path === "division")?.message}</p>
                    )}
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
                          <SelectItem key={reg} value={reg}>{reg}</SelectItem>
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
                            <SelectItem key={dis} value={dis}>{dis}</SelectItem>
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
                          Object.values(ClubRole)
                            .filter(role => role !== ClubRole.VISITOR)
                            .map(role =>
                              <SelectItem key={role} value={role}>{role}</SelectItem>
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
      </AlertDialogHeader>
    </AlertDialogContent>
  )
}