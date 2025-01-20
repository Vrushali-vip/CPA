"use client";

export default function CopyCodeButton({ code }: { code: string|undefined }) {

    async function copyCode() {
        try {
            await navigator.clipboard.writeText(window.location.origin + "?code=" + code);
            alert("Copied to clipboard!");
        } catch (error) {
            console.error("Error copying code:", error);
        }
    }

    return (
        <button className="a-btn text-primary-3 font-mont fw-600" onClick={copyCode}>
            {code}
        </button>
    );
}