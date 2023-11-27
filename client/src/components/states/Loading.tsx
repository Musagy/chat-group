import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

const LoadingElement = ({ className }: { className: string }) => (
  <div className={"overflow-hidden " + className}>
    <svg
      className="animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
)

function Loading({
  className,
  ctnClassName,
}: {
  className: string
  ctnClassName?: string
}) {
  return (
    <div
      className={
        "w-full grid place-items-center flex-1 " + (ctnClassName || "")
      }
    >
      <LoadingElement className={className} />
    </div>
  )
}
export function LoadingWithInView({
  className,
  ctnClassName,
  onView,
}: {
  className: string
  ctnClassName?: string
  onView: (isInView: boolean) => void
}) {
  const { ref, inView } = useInView()
  useEffect(() => {
    onView(inView)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])
  return (
    <section
      className={
        "w-full grid place-items-center flex-1 " + (ctnClassName || "")
      }
      key={"loaderInView"}
      ref={ref}
    >
      <LoadingElement className={className} />
    </section>
  )
}

export function TextLoading({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={"animate-pulse rounded-full " + className} />
}
export function LoadingApp({ visible }: { visible: boolean }) {
  return (
    <div
      className={
        "absolute w-full h-full bg-[#1d1b21] flex flex-col justify-center items-center gap-2 animated " +
        (!visible && "opacity-0 pointer-events-none delay-300 z-20")
      }
    >
      <h2 className="text-5xl font-bold text-white tracking-tighter">
        Chat Grupal
      </h2>
      <p className="animate-pulse text-2xl font-semibold text-msg_input max-w-[150px] text-center">
        ¡Para todo!
      </p>
      <p className="absolute bottom-2 text-msg_input text-lg">
        Creado por <span className="font-bold saturate-200">Musagy</span>
      </p>
    </div>
  )
}

export default Loading
