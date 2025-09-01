import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';
import { Presets } from '@/constants/PRESETS';

interface SearchableSelectPresetProps {
  value: string | null;
  onValueChange: (value: string) => void;
}

export function SearchableSelectPreset({ value, onValueChange }: SearchableSelectPresetProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {value ? value : 'Select Preset...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search presets..." />
          <CommandList>
            <CommandEmpty>No presets found.</CommandEmpty>
            <CommandGroup>
              {Presets.map((preset) => (
                <CommandItem
                  key={preset.name}
                  value={preset.name}
                  onSelect={() => onValueChange(preset.name)}
                  className="flex items-center gap-2 cursor-pointer">
                  <CheckIcon
                    className={`h-4 w-4 ${value === preset.name ? 'opacity-100' : 'opacity-0'}`}
                  />
                  {preset.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
