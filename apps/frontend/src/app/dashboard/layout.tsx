import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { Header } from "../../component/Header";

export default async function DashBoardLayout({ children }: { children: React.ReactNode }) {
    const token = (await cookies()).get("auth");

    if (!token) redirect("/");

    return (
        <div>
            <Header isAuthenticat={true}/>
            {children}
        </div>
    )
}