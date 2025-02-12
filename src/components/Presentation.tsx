import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Cookies from "js-cookie"

const features = [
  {
    title: "Bem-vindo(a) ao Placey",
    description: "Descubra como nosso aplicativo pode ajudar você a organizar suas finanças.",
    icon: "👋",
  },
  {
    title: "Gerenciamento de Gastos",
    description: "Organize seus gastos diários, defina prioridades e acompanhe seu progresso com facilidade.",
    icon: "📋",
  },
  {
    title: "Gerenciamento de Receitas",
    description: "Organize suas receitas, gerenciando suas entradas monetárias.",
    icon: "👥",
  },
  {
    title: "Análise de Gastos Mensais",
    description: "Visualize relatórios detalhados sobre seus gastos e identifique áreas que possa melhorar.",
    icon: "📊",
  },
  {
    title: "Comece Agora",
    description: "Está pronto para gerenciar seus gastos? Comece o Placey agora mesmo!",
    icon: "🚀",
  },
]

export default function PresentationScreen() {
  const [currentStep, setCurrentStep] = useState(0)

  const changeFirstTime = () => {
    Cookies.set("firstTime", "true");
  }

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, features.length - 1))
  }

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  const currentFeature = features[currentStep]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full text-center">
          <div className="text-6xl mb-4">{currentFeature.icon}</div>
          <h1 className="text-4xl font-bold mb-6">{currentFeature.title}</h1>
          <p className="text-xl mb-12">{currentFeature.description}</p>
          <div className="flex justify-center space-x-4 mb-12">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-4 h-4 rounded-full transition-colors duration-200 ${
                  currentStep === index ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir para o passo ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <Button onClick={goToPreviousStep} disabled={currentStep === 0} variant="outline" size="lg">
              <ChevronLeft className="mr-2 h-5 w-5" /> Anterior
            </Button>
            {currentStep < features.length - 1 ? (
              <Button onClick={goToNextStep} className="bg-primaryPurple hover:bg-blue-950 text-white border border-primaryPurple" size="lg">
                Próximo <ChevronRight color="white" className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button className="bg-primaryPurple hover:bg-blue-950 text-white border border-primaryPurple" onClick={() => changeFirstTime()} size="lg">
                Começar
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

