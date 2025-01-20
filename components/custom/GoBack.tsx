"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function GoBack() {
    const router = useRouter();
    return (
        <Button
            variant="link"
            onClick={() => router.back()}
        >
            <ArrowLeft size={18} />Back
        </Button>
    );
};