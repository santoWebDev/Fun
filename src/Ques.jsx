import { useState, useRef, useEffect } from "react";
import { Heart, IndianRupee, CheckCircle2 } from "lucide-react";

export default function QuestionPage() {
    const [page, setPage] = useState("scaryPage");
    const [dogde, setDogde] = useState({ x: 0, y: 0, fixed: false });
    const [dodgeCount, setDodgeCount] = useState(0);
    const cardRef = useRef(null);

    const dogdeNo = () => {
        const buttonWidth = 90;
        const buttonHeight = 48;
        const card = cardRef.current.getBoundingClientRect();

        // expand the allowed dodge zone to 50% beyond the card on every side
        const zoneLeft = card.left - card.width * 0.5;
        const zoneRight = card.right + card.width * 0.5;
        const zoneTop = card.top - card.height * 0.5;
        const zoneBottom = card.bottom + card.height * 0.5;

        // clamp that zone so the button never goes off the real screen
        const minX = Math.max(0, zoneLeft);
        const maxX = Math.min(window.innerWidth - buttonWidth, zoneRight - buttonWidth);
        const minY = Math.max(0, zoneTop);
        const maxY = Math.min(window.innerHeight - buttonHeight, zoneBottom - buttonHeight);

        const randomLeft = minX + Math.random() * Math.max(0, maxX - minX);
        const randomTop = minY + Math.random() * Math.max(0, maxY - minY);

        setDogde({ x: randomLeft, y: randomTop, fixed: true });
        setDodgeCount((c) => c + 1);
    };

    const resetAndGo = (nextPage) => {
        setPage(nextPage);
        setDogde({ x: 0, y: 0, fixed: false });
        setDodgeCount(0);
    };

    const NoButton = ({ inline }) => (
        <button
            onMouseEnter={dogdeNo}
            onTouchStart={(e) => { e.preventDefault(); dogdeNo(); }}
            onClick={dogdeNo}
            style={
                !inline
                    ? { position: "fixed", left: dogde.x, top: dogde.y, margin: 0 }
                    : {}
            }
            className="font-bold text-amber-950/80 bg-white/70 hover:bg-white/70
        border border-white/60 backdrop-blur-md rounded-full px-8 py-3
        transition-all duration-150 ease-out touch-none z-[9999] shadow-lg whitespace-nowrap"
        >
            No
        </button>
    );

    const TauntMessage = () =>
        dodgeCount >= 5 && dodgeCount < 6 ? (
            <p
                style={
                    dogde.fixed
                        ? {
                            position: "fixed",
                            left: dogde.x,
                            top: dogde.y - 32,
                            margin: 0,
                        }
                        : {}
                }
                className="text-sm font-bold text-red-800 whitespace-nowrap z-[9999] text-center"
            >
                You have only one option
            </p>
        ) : null;

    const PermanentTaunt = () =>
        dodgeCount >= 6 ? (
            <p className="text-sm font-bold text-red-800 text-center mt-2">
                You have only one option
            </p>
        ) : null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 font-sans bg-gradient-to-br from-red-200 via-amber-300 to-red-500 relative">
            <div
                ref={cardRef}
                className="relative w-full max-w-md rounded-3xl p-10 overflow-visible
          bg-white/25 backdrop-blur-xl border border-white/50
          shadow-[0_8px_32px_rgba(180,140,20,0.35)]"
            >
                <div className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 bg-white/40 rounded-full blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -right-10 w-56 h-56 bg-yellow-100/40 rounded-full blur-3xl" />

                {page === "scaryPage" && (
                    <>
                        <Heart className="mx-auto mb-4 text-amber-700 drop-shadow-sm" size={32} strokeWidth={1.5} />
                        <h1 className="text-2xl font-bold text-amber-950 mb-2 drop-shadow-sm text-center">
                            If you believe in me
                        </h1>
                        <p className="text-sm text-amber-900/70 mb-10 text-center">
                            ...click the button. If you dare.
                        </p>

                        <div className="relative h-40 flex items-center justify-center gap-6">
                            <button
                                onClick={() => resetAndGo("question")}
                                className="relative font-bold text-red-100 bg-gradient-to-b from-red-950 via-black to-red-950
                  border-2 border-red-700 rounded-lg px-8 py-3 tracking-widest uppercase text-sm
                  shadow-[0_0_15px_rgba(220,38,38,0.6),0_0_35px_rgba(220,38,38,0.3)]
                  hover:shadow-[0_0_20px_rgba(220,38,38,0.9),0_0_45px_rgba(220,38,38,0.55)]
                  hover:scale-105 active:scale-95
                  transition-all duration-200 ease-out
                  animate-pulse"
                            >
                                Click Here
                            </button>

                            {dodgeCount < 6 && !dogde.fixed && (
                                <div className="flex flex-col items-center gap-1">
                                    <TauntMessage />
                                    <NoButton inline />
                                </div>
                            )}
                        </div>
                        <PermanentTaunt />
                    </>
                )}

                {page === "question" && (
                    <>
                        <Heart className="mx-auto mb-4 text-amber-700 drop-shadow-sm" size={32} strokeWidth={1.5} />
                        <h1 className="text-2xl font-bold text-amber-950 mb-2 drop-shadow-sm text-center">
                            Am I your caring, reliable, strong, brother
                        </h1>
                        <p className="text-s text-bold-amber-900/70 mb-10 text-center">
                            Choose wisely. One of these buttons is cooperating.
                        </p>
                        <div className="relative h-40 flex items-center justify-center gap-6">
                            <button
                                onClick={() => resetAndGo("reveal")}
                                className="font-bold text-amber-950/80 bg-white/40 hover:bg-white/40
                  border border-white/60 backdrop-blur-md rounded-full px-8 py-3
                  transition-transform duration-200 ease-out"
                            >
                                Yes
                            </button>
                            {dodgeCount < 6 && !dogde.fixed && (
                                <div className="flex flex-col items-center gap-1">
                                    <TauntMessage />
                                    <NoButton inline />
                                </div>
                            )}
                        </div>
                        <PermanentTaunt />
                    </>
                )}

                {page === "reveal" && (
                    <>
                        <CheckCircle2 className="mx-auto mb-3 text-amber-700" size={30} strokeWidth={1.5} />
                        <p className="text-xs text-amber-900/70 mb-1 text-center">
                            Correct answer confirmed. Processing gratitude...
                        </p>
                        <h2 className="text-2xl font-bold text-amber-950 mb-2 drop-shadow-sm text-center">
                            Send me ₹1000 for being a caring brother
                        </h2>
                        <div className="flex items-center justify-center text-amber-950 my-4 drop-shadow-sm">
                            <IndianRupee size={32} strokeWidth={3} />
                            <span className="text-5xl font-bold">1000</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-2xl font-bold text-amber-950 mb-2">
                                Want a Gpay Scanner
                            </h1>
                            <button
                                onClick={() => resetAndGo("Scanner")}
                                className="font-bold text-amber-950/80 bg-white/40 hover:bg-white/40
                  border border-white/60 backdrop-blur-md rounded-full px-8 py-3
                  transition-transform duration-200 ease-out text-center"
                            >
                                Click Me
                            </button>
                        </div>
                    </>
                )}

                {page === "Scanner" && (
                    <>
                        <CheckCircle2 className="mx-auto mb-3 text-amber-700" size={30} strokeWidth={1.5} />
                        <h2 className="text-2xl font-bold text-amber-950 mb-2 drop-shadow-sm text-center">
                            You can send me more than
                        </h2>
                        <div className="flex items-center justify-center text-amber-950 my-4 drop-shadow-sm">
                            <IndianRupee size={32} strokeWidth={3} />
                            <span className="text-5xl font-bold">1000</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-2xl font-bold text-amber-950 mb-3">
                                Scan to Pay
                            </h1>
                            <div className="bg-white/70 p-3 rounded-2xl border border-white/80 shadow-[0_4px_16px_rgba(180,140,20,0.25)]">
                                <img
                                    src="/gpay-qr.png"
                                    alt="GPay QR code"
                                    className="w-48 h-48 object-contain rounded-lg"
                                />
                            </div>
                            <p className="text-xs text-amber-900/60 mt-3 mb-5">
                                Scan with any UPI app
                            </p>
                            <button
                                onClick={() => resetAndGo("scaryPage")}
                                className="font-bold text-amber-950/80 bg-white/40 hover:bg-white/40
                  border border-white/60 backdrop-blur-md rounded-full px-8 py-3
                  transition-transform duration-200 ease-out text-center"
                            >
                                Back to page one
                            </button>
                        </div>
                    </>
                )}
            </div>

           
            {dogde.fixed && dodgeCount < 6 && (page === "scaryPage" || page === "question") && (
                <>
                    <TauntMessage />
                    <NoButton />
                </>
            )}
        </div>
    );
}