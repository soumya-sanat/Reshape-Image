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
      <PopoverContent className="p-0 w-auto min-w-[var(--radix-popover-trigger-width)] max-w-[95vw]">
        <Command className="w-full">
          <CommandInput placeholder="Search presets..." />
          <CommandList>
            <CommandEmpty>No presets found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {Presets.map((preset) => (
                <CommandItem
                  key={preset.name}
                  value={preset.name}
                  onSelect={() => onValueChange(preset.name)}
                  className="flex items-center gap-2 cursor-pointer">
                  <CheckIcon
                    className={`h-4 w-4 flex-shrink-0 ${value === preset.name ? 'opacity-100' : 'opacity-0'}`}
                  />
                  <span className="truncate">{preset.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
