import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, signOut, User, Auth } from 'firebase/auth';
import { auth } from './firebase-config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user: User | null = null;

  constructor() { }

  public async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      this.user = userCredential.user;

      return this.user;
    } catch (error) {
      console.error("Error logging in: ", error);
      return null;
    }
  }

  public async logout(): Promise<void> {
    await signOut(auth);
    this.user = null;
  }

  public isAuthenticated(): boolean {
    return this.user !== null;
  }
}