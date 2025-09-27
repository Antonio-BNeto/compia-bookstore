package com.compia.payment.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@ResponseStatus(HttpStatus.NOT_FOUND)
@Getter
public class ErrorException extends RuntimeException {

  private final List<String> args;

  public ErrorException(String message) {
    super(message);
    this.args = null;
  }

  public ErrorException(String message, List<String> args) {
    super(message);
    this.args = args;
  }

  public ErrorException(Throwable cause) {
    super(cause.getMessage() != null ? cause.getMessage() : "Bad Request", cause);
    this.args = null;
  }

}