
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Volume2, 
  Pause, 
  StopCircle 
} from "lucide-react";
import { useSpeechSynthesis } from 'react-speech-kit';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogAccessibilityControlsProps {
  content: string;
  onTranslate: (language: string) => void;
  currentLanguage: string;
}

const BlogAccessibilityControls: React.FC<BlogAccessibilityControlsProps> = ({
  content,
  onTranslate,
  currentLanguage
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { speak, cancel, speaking } = useSpeechSynthesis();
  
  const handleSpeak = () => {
    if (speaking) {
      cancel();
      setIsPlaying(false);
    } else {
      speak({ text: content });
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    cancel();
    setIsPlaying(false);
  };

  const handleLanguageChange = (value: string) => {
    onTranslate(value);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
      <div className="flex-1 flex items-center gap-2">
        <Globe size={18} />
        <Select value={currentLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="pt">Portuguese</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSpeak}
          disabled={!content}
          className="flex items-center gap-2"
        >
          {isPlaying && speaking ? <Pause size={16} /> : <Volume2 size={16} />}
          {isPlaying && speaking ? "Pause" : "Listen"}
        </Button>
        
        {isPlaying && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleStop}
            className="flex items-center gap-2"
          >
            <StopCircle size={16} />
            Stop
          </Button>
        )}
      </div>
    </div>
  );
};

export default BlogAccessibilityControls;
