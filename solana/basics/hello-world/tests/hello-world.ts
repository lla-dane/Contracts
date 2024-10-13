import * as anchor from "@coral-xyz/anchor";
import { HelloWorld } from "../target/types/hello_world";
const { SystemProgram } = anchor.web3;

describe("basics", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.HelloWorld as anchor.Program<HelloWorld>;
  const feedPostApp = anchor.web3.Keypair.generate();

  it("Say hello!", async () => {
    const num = new anchor.BN(2);

    await program.rpc.createPost("hello", "www.imagrurl.com", num, false, {
      accounts: {
        feedPostApp: feedPostApp.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [feedPostApp],
    });

    const account = await program.account.feedPostApp.fetch(
      feedPostApp.publicKey
    );

    console.log(account.media);
  });
});
