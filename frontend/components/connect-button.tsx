interface ConnectButtonProps {
    label?: string;
  }

export default function ConnectButton({label = "Connect Wallet"}: ConnectButtonProps) {
    return <appkit-button size="sm" label={label} />
}