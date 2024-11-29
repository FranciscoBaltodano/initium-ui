export const Loader = () => {
  return (
    <div class="flex flex-row gap-2 h-screen items-center justify-center">
        <div class="w-4 h-4 rounded-full bg-white/70 animate-bounce"></div>
        <div class="w-4 h-4 rounded-full bg-white/70 animate-bounce [animation-delay:-.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-white/70 animate-bounce [animation-delay:-.5s]"></div>
    </div>  
  )
}